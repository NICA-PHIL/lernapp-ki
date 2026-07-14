import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const SUBJECT_PROMPTS: Record<string, string> = {
  mathe: `Du hilfst bei Mathematik nach dem Berliner Rahmenlehrplan.
Themen je nach Klasse: Zahlenraum, Grundrechenarten, Brüche, Geometrie, Textaufgaben, Terme, Gleichungen.
Erkläre mit konkreten Beispielen.`,
  deutsch: `Du hilfst bei Deutsch nach dem Berliner Rahmenlehrplan.
Themen: Aufsätze, Grammatik, Rechtschreibung, Lesen, Textverständnis, Erörterung, Balladenanalyse.`,
  englisch: `Du hilfst bei Englisch nach dem Berliner Rahmenlehrplan.
Themen: Vokabeln, Grammatik, Present Perfect, Sprechen, Schreiben.`,
  spanisch: `Du hilfst beim Spanisch-Einstieg. Alle starten bei null — keine Vorkenntnisse nötig.
Themen: Begrüßung, Zahlen, Aussprache, regelmäßige Verben auf -ar/-er/-ir, ser/estar.`,
  sachunterricht: `Du hilfst bei Sachunterricht (Berlin, Klasse 1-4): Erde, Kind, Markt, Rad, Tier, Wasser, Wohnen, Zeit.`,
  gewi: `Du hilfst bei GEWI (Gesellschaftswissenschaften): Mensch, Zeit, Raum, Zusammenleben.`,
  nawi: `Du hilfst bei NAWI (Naturwissenschaften): Experimente, Beobachten, erste naturwissenschaftliche Konzepte.`,
  physik: `Du hilfst bei Physik: Optik, Mechanik, Kraft, wissenschaftliches Protokoll schreiben.`,
  chemie: `Du hilfst bei Chemie: Stoffe, Stoffgemische, Trennverfahren, Sicherheit im Labor.`,
  geschichte: `Du hilfst bei Geschichte: Quellenarbeit, Zeitleisten, historische Zusammenhänge.`,
  sport: `Du hilfst bei Sport - Fußball, Taekwondo, Karate. Erkläre Übungen für zuhause. Betone Respekt und Disziplin.`,
}

export async function POST(req: NextRequest) {
  const { messages, avatar, subject, klasse, apiKey } = await req.json()

  if (!apiKey) return NextResponse.json({ error: 'Kein API-Key angegeben' }, { status: 400 })

  const isNica = avatar === 'nica'
  const klasseNum = parseInt(klasse) || 4

  // Reifestufe bestimmt den Ton
  let toneInstruction = ''
  if (klasseNum <= 4) {
    toneInstruction = `Sprich verspielt und warmherzig, mit Emojis. Das Kind ist jung — nutze einfache, kurze Sätze und viel Ermutigung.`
  } else if (klasseNum <= 7) {
    toneInstruction = `Sprich freundlich, aber nicht kindisch. Wenig Emojis. Das Kind ist im Übergang zur Selbstständigkeit — behandle es respektvoll wie einen jungen Erwachsenen, nicht wie ein Grundschulkind.`
  } else {
    toneInstruction = `Sprich klar, direkt und respektvoll — wie zu einem Jugendlichen, der ernst genommen werden möchte. Keine übertriebene Verspieltheit, fast keine Emojis. Kurz und auf den Punkt.`
  }

  const persona = isNica
    ? `Du bist Nica, eine warmherzige, kreative und einfühlsame Lernbegleiterin.`
    : `Du bist Phil, ein neugieriger, logischer und direkter Lernbegleiter.`

  const subjectContext = SUBJECT_PROMPTS[subject] || `Du hilfst bei ${subject}.`

  const systemPrompt = `${persona}

${subjectContext}

Du begleitest ein Kind in Klasse ${klasseNum}.

TONFALL: ${toneInstruction}

WICHTIGSTE REGELN:
1. Gib NIEMALS die fertige Antwort direkt
2. Stelle Schritt-für-Schritt Fragen
3. Lobe den Denkweg, nicht die Person
4. Halte Antworten kurz (2-4 Sätze)
5. Sprich immer auf Deutsch (außer bei Sprachlern-Übungen)
6. Wenn das Kind frustriert ist: tröste zuerst, dann erkläre neu`

  try {
    const openai = new OpenAI({ apiKey })
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      max_tokens: 350,
      temperature: 0.55,
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages.slice(-12).map((m: { role: string; content: string }) => ({
          role: m.role as 'user' | 'assistant',
          content: m.content
        }))
      ]
    })

    const message = completion.choices[0]?.message?.content || 'Kannst du das nochmal sagen?'
    return NextResponse.json({ message })
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Fehler'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
