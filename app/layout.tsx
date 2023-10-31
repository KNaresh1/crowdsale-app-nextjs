import '@radix-ui/themes/styles.css';
import './theme-config.css'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Theme } from '@radix-ui/themes'

import NavBar from './NavBar'
import AppProvider from './AppProvider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Crowdsale App',
  description: 'Crowdsale ICO app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <AppProvider>
          <Theme>
            <NavBar />
            <main>{children}</main>
          </Theme>
        </AppProvider>
      </body>
    </html>
  )
}
