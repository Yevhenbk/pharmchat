"use server"

import prisma from "@/lib/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { normalizeProperty } from "@/utils/actions.helper"

export async function addChat(formData: FormData) {
  const { isAuthenticated, getUser } = getKindeServerSession()
  const isLoggedIn = await isAuthenticated()
  if (!isLoggedIn) {
    redirect("/api/auth/login")
  }
  const user = await getUser()

  await prisma.chat.create({
    data: {
      chatTitle: formData.get("chatTitle") as string,
      kindeAuthId: user?.id as string,
    },
  })

  revalidatePath("/chat")
}

export async function deleteChat(chatId: number) {
  const { isAuthenticated } = getKindeServerSession()
  const isLoggedIn = await isAuthenticated()
  if (!isLoggedIn) {
    redirect("/api/auth/login")
  }

  await prisma.chat.delete({
    where: {
      id: chatId,
    },
  })

  revalidatePath("/chat")
}

export async function deleteMessage(messageId: number) {
  const { isAuthenticated } = getKindeServerSession()
  const isLoggedIn = await isAuthenticated()
  if (!isLoggedIn) {
    redirect("/api/auth/login")
  }

  await prisma.message.delete({
    where: {
      id: messageId,
    },
  })

  revalidatePath("/chat")
}

export async function addMessage(chatId: number, question: string, response: string) {
  const { isAuthenticated, getUser } = getKindeServerSession()
  const isLoggedIn = await isAuthenticated()
  if (!isLoggedIn) {
    redirect("/api/auth/login")
  }

  const user = await getUser()

  await prisma.message.create({
    data: {
      chat: {
        connect: {
          id: chatId
        },
      },
      kindeAuthId: user?.id as string,
      question: question,
      response: String(response),
    },
  })

  revalidatePath(`/chat/${chatId}`)
}

export async function getMedication(chatId: number, genericName: string, selectedInfo: string | null = null) {
  const apiKey = process.env.NEXT_FDA_API_KEY
  const baseUrl = `https://api.fda.gov/drug/label.json?api_key=${apiKey}`

  const res = await fetch(`${baseUrl}&search=openfda.generic_name:${genericName}&limit=1`)

  if (!res.ok) {
    throw new Error("Failed to fetch data")
  }
 
  const jsonData = await res.json()

  let infoToUse = selectedInfo || "purpose"

  const normalizedInfo = normalizeProperty(infoToUse)

  const selectedData = jsonData.results.map((result: any) => (
    result[normalizedInfo]))

  if (selectedData) {
    await addMessage(chatId, genericName, selectedData)
  }
}