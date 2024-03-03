"use client"

import prisma from "@/lib/db"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { redirect } from "next/navigation"

export function addMessage({
  id, question, response
}: {
  id: number, question: string, response: string
}) {
  const { isAuthenticated, user } = useKindeBrowserClient()
  if (!isAuthenticated) {
    redirect("/api/auth/login")
  }

  prisma.message.create({
    data: {
      chat: {
        connect: {
          id: id as number,
        },
      },
      kindeAuthId: user?.id as string,
      question: question as string,
      response: response as string,
    },
  })
}