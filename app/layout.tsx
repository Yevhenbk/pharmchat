import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import "@styles/globals.scss";
import { SessionProvider } from "@providers/session-provider";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pharmchat",
  description: "Clinical procurement intelligence for Pharmchat",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
