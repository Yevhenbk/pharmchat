import { FC, ReactNode } from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Pharmchat",
  description: "Pharmaceutical chatbot app built with Next.js, Open Assistant AI, Kinde Auth, FDA drugs API and Prisma.",
  icons: {
    icon: "/logo.svg",
  },
}

interface RootLayoutProps {
  readonly children: ReactNode
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}

export default RootLayout
