import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Produktmanager-Handoff — intern',
  robots: { index: false, follow: false },
}

export default function ProduktmanagerHandoffLayout({ children }: { children: React.ReactNode }) {
  return children
}
