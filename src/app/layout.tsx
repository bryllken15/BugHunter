import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bug Hunter - Learn to Code by Hunting Bugs',
  description: 'A gamified coding education platform inspired by Duolingo for learning HTML, CSS, and JavaScript through interactive bug-hunting challenges.',
  keywords: ['coding', 'education', 'HTML', 'CSS', 'JavaScript', 'learning', 'programming'],
  authors: [{ name: 'Bug Hunter Team' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
