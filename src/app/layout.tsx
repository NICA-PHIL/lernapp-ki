import type { Metadata } from "next"
import { Fredoka, Atkinson_Hyperlegible } from "next/font/google"
import "./globals.css"

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
})

const atkinson = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-body",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Nica & Phil — Der KI-Lernbegleiter",
  description: "Nica & Phil begleitet Kinder beim Lernen — mit Nica für Sprachen & Kreativität und Phil für Mathe & Logik.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${fredoka.variable} ${atkinson.variable}`}>
      <body>{children}</body>
    </html>
  )
}
