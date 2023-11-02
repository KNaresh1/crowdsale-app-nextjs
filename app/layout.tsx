import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import './theme-config.css';

import AppProvider from './AppProvider';
import NavBar from './NavBar';

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
