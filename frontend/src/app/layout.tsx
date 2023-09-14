import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ApolloWrapper } from '../lib/apollo-wrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Products marketplace POC',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloWrapper>
        {children}
        </ApolloWrapper>
      </body>
    </html>
  )
}
