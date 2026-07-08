import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

export async function POST(req: NextRequest) {
  const { messages, avatar, subject, klasse, apiKey } = await req.json()
  if (!apiKey) return NextResponse.json({ error: 'Kein API-Key' }, { status: 400 })

  const isNica = avatar === 'nica'
  const system = `Du bist ${isNica ? 'Nica, warmherzig und kreativ' : 'Phil, logisch und sportlich'}.
Du hilfst bei ${subject} für Klasse ${klasse || 4}.
REGEL: Gib nie die Antwort direkt. Stelle Fragen. Erkläre Schritt für Schritt. Max 3 Sätze.`

  const openai = new OpenAI({ apiKey })
  const res = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    max_tokens: 300,
    temperature: 0.5,
    messages: [
      { role: 'system', content: system },
      ...messages.slice(-10)
    ]
  })
  return NextResponse.json({ message: res.choices[0]?.message?.content })
}
