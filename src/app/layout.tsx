import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { type ReactNode } from "react"
import "./globals.css"

import Navbar from "@/components/Navbar"
import { Toaster } from "@/components/ui/toaster"
import { Providers } from "./providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Wallet Connect ",
  description: "Wagmi Wallet Connect example",
}

export default function RootLayout(props: { children: ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {props.children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
