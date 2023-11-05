import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./theme-config.css";

import NavBar from "./NavBar";
import Web3Provider from "./Web3Provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Crowdsale App",
  description: "Crowdsale ICO app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Web3Provider>
          <Theme>
            <NavBar />
            <main>{children}</main>
          </Theme>
        </Web3Provider>
      </body>
    </html>
  );
}
