import { NextPage } from 'next'
import prisma from '@/lib/db'
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"
import LogoNav from '@/components/LogoNav'
import { BiHealth } from "react-icons/bi"
import ChatWindow from '@/components/chatbot/ChatWindow'
import Input from '@/components/Input'

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
    <div className='bg-primaryGrey h-[100dvh] w-full flex flex-col justify-between
    items-center'>
      <LogoNav />
      <ChatWindow messages={messages} />
    </div>
  )
}

export default Page