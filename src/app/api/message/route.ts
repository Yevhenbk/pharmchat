import prisma from "@/lib/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { NextResponse } from "next/server"
import { redirect } from "next/navigation"

export async function POST(request: Request) {
  const { userContent, aiContent, chatId } = await request.json()

  const { isAuthenticated, getUser } = getKindeServerSession()
  const isLoggedIn = await isAuthenticated()
  if (!isLoggedIn) {
    redirect("/api/auth/login")
  }

  const user = await getUser()

  try {
    const savedMessages = await prisma.message.create({
      data: {
        chat: { connect: { id: chatId } },
        kindeAuthId: user?.id as string,
        question: userContent,
        response: aiContent,
      },
    })

    console.log("LAAAAA", savedMessages)

    return NextResponse.json(savedMessages)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Internal Server Error" })
  }
}
