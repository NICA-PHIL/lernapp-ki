import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Nica & Phil — Der KI-Lernbegleiter",
  description: "Nica & Phil begleitet Kinder beim Lernen — mit Nica für Sprachen & Kreativität und Phil für Mathe & Logik.",
  icons: { icon: "/avatars/duo-circle.png" },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  )
}
