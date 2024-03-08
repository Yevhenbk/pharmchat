import { NextPage } from 'next'
import prisma from '@/lib/db'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"
import AskAI from '@/components/chatbot/AskAI'

interface PageProps {
  params: {
    id: string
  }
}

const Page: NextPage<PageProps> = async ({ params }) => {
  const { isAuthenticated, getUser } = getKindeServerSession()
  const isLoggedIn = await isAuthenticated()
  if (!isLoggedIn) {
    redirect("/api/auth/login")
  }

  const user = await getUser()
  const messages = await prisma.message.findMany({
    where: {
      kindeAuthId: user?.id,
      chatId: parseInt(params.id)
    },
  })

  return (
    <div>
      My Post: {params.id}
      <AskAI />
    </div>
  )
}

export default Page