import prisma from "@/lib/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"
import { addChat } from "@/actions/actions"
import ChatView from "@/components/ChatView"
import ChatList from "@/components/chatbot/ChatList"
import { NextPage } from "next"

export const dynamic = "force-dynamic"

const Page: NextPage = async () => {
  const { isAuthenticated, getUser } = getKindeServerSession()
  const isLoggedIn = await isAuthenticated()
  if (!isLoggedIn) {
    redirect("/api/auth/login")
  }

  const user = await getUser()
  const chat = await prisma.chat.findMany({
    where: {
      kindeAuthId: user?.id,
    },
  })

  return (
    <div className="h-[100dvh] w-full flex justify-center items-center
    bg-black">
      <ChatView user={user}>
        <ChatList chatList={chat} createChat={addChat} />
      </ChatView>
    </div>
  )
}

export default Page