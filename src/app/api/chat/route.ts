import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { createClient } from '@/lib/supabase/server'

const SUBJECT_PROMPTS: Record<string, string> = {
  mathe: `Mathematik nach Berliner Rahmenlehrplan: Zahlenraum, Grundrechenarten, Brüche, Geometrie, Terme, Gleichungen.`,
  deutsch: `Deutsch nach Berliner Rahmenlehrplan: Aufsätze, Grammatik, Rechtschreibung, Lesen, Erörterung.`,
  englisch: `Englisch nach Berliner Rahmenlehrplan: Vokabeln, Grammatik, Present Perfect, Sprechen, Schreiben.`,
  spanisch: `Spanisch-Einstieg. Alle starten bei null. Begrüßung, Zahlen, ser/estar.`,
  sachunterricht: `Sachunterricht Klasse 1-4: Erde, Kind, Markt, Rad, Tier, Wasser, Wohnen, Zeit.`,
  gewi: `GEWI: Mensch, Zeit, Raum, Zusammenleben.`,
  nawi: `NAWI: Experimente, Beobachten, naturwissenschaftliche Konzepte.`,
  physik: `Physik: Optik, Mechanik, Kraft, Protokoll schreiben.`,
  chemie: `Chemie: Stoffe, Stoffgemische, Trennverfahren, Laborsicherheit.`,
  geschichte: `Geschichte: Quellenarbeit, Zeitleisten, historische Zusammenhänge.`,
  sport: `Sport - Fußball, Taekwondo, Karate. Übungen für zuhause. Respekt und Disziplin.`,
}

function buildSystemPrompt(avatar: string, subject: string, klasse: number) {
  const isNica = avatar === 'nica'
  const klasseNum = klasse || 4
  let ton = ''
  if (klasseNum <= 4) ton = 'Sprich verspielt, warmherzig, mit Emojis, kurze Sätze.'
  else if (klasseNum <= 7) ton = 'Sprich freundlich, aber nicht kindisch. Wenig Emojis.'
  else ton = 'Sprich klar, direkt, respektvoll wie zu einem Jugendlichen. Kaum Emojis.'

  const persona = isNica ? 'Du bist Nica, warmherzig, kreativ, einfühlsam.' : 'Du bist Phil, neugierig, logisch, direkt.'
  const context = SUBJECT_PROMPTS[subject] || `Hilf bei ${subject}.`

  return `${persona}\n\n${context}\n\nDu begleitest ein Kind in Klasse ${klasseNum}.\nTONFALL: ${ton}\n\nREGELN:\n1. Gib NIEMALS die fertige Antwort direkt\n2. Stelle Schritt-für-Schritt Fragen\n3. Lobe den Denkweg\n4. Kurze Antworten (2-4 Sätze)\n5. Deutsch, außer bei Sprachübungen`
}

async function callOpenAI(apiKey: string, system: string, messages: any[]) {
  const openai = new OpenAI({ apiKey })
  const res = await openai.chat.completions.create({
    model: 'gpt-4o-mini', max_tokens: 350, temperature: 0.55,
    messages: [{ role: 'system', content: system }, ...messages.slice(-12)],
  })
  return res.choices[0]?.message?.content || 'Kannst du das nochmal sagen?'
}

async function callAnthropic(apiKey: string, system: string, messages: any[]) {
  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'x-api-key': apiKey, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-3-5-haiku-20241022', max_tokens: 350, system,
      messages: messages.slice(-12).map((m: any) => ({ role: m.role, content: m.content })),
    }),
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error.message)
  return data.content?.[0]?.text || 'Kannst du das nochmal sagen?'
}

async function callGemini(apiKey: string, system: string, messages: any[]) {
  const history = messages.slice(-12).map((m: any) => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] }))
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ systemInstruction: { parts: [{ text: system }] }, contents: history }),
  })
  const data = await res.json()
  if (data.error) throw new Error(data.error.message)
  return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Kannst du das nochmal sagen?'
}

export async function POST(req: NextRequest) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Nicht angemeldet' }, { status: 401 })

  const { messages, avatar, subject, klasse, apiKey, provider } = await req.json()
  if (!apiKey) return NextResponse.json({ error: 'Kein API-Key angegeben' }, { status: 400 })
  if (!Array.isArray(messages) || messages.length > 50) {
    return NextResponse.json({ error: 'Ungültige Anfrage' }, { status: 400 })
  }

  const system = buildSystemPrompt(avatar, subject, parseInt(klasse) || 4)

  try {
    let message: string
    if (provider === 'anthropic') message = await callAnthropic(apiKey, system, messages)
    else if (provider === 'gemini') message = await callGemini(apiKey, system, messages)
    else message = await callOpenAI(apiKey, system, messages)
    return NextResponse.json({ message })
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Fehler'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
