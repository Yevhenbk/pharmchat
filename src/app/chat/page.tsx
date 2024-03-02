import { FC } from "react"
import prisma from "@/lib/db"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { redirect } from "next/navigation"
import { addChat, deleteChat } from "@/actions/actions"
import ViewWrapper from "@/components/ViewWrapper"
import ChatView from "@/components/ChatView"
import ChatList from "@/components/chatbot/ChatList"

const Chat: FC = async () => {
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
    <ViewWrapper>
      <ChatView>
        <ChatList chatList={chat} createChat={addChat} />
      </ChatView>
    </ViewWrapper>
  )
}

export default Chat