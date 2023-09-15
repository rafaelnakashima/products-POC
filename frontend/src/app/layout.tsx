"use client";

import './globals.css'
import { Inter } from 'next/font/google'
import { ApolloWrapper } from '../lib/apollo-wrapper'
import { CartProvider } from '../context/CartContext'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

const inter = Inter({ subsets: ['latin'] })

const initialOptions = {
  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID as string,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PayPalScriptProvider
          options={initialOptions}>
          <CartProvider>
            <ApolloWrapper>
              {children}
            </ApolloWrapper>
          </CartProvider>
        </PayPalScriptProvider>
      </body>
    </html>
  )
}
