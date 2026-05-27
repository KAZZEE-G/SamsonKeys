import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Samson Keys — Rare & Luxury',
  description: 'Fewer pieces. More meaning. A curated marketplace for the genuinely rare.',
  metadataBase: new URL('https://samsonkeys.com'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@200;300;400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
