import { FC } from "react"
import ChatHeader from "./ChatHeader"
import ChatForm from "./ChatForm"
import AskAIButton from "../AskAIButton"
import { ChatData } from "@/utils/chatData"

interface ChatListProps {
  chatList: { 
    id: number
    chatTitle: string
    kindeAuthId: string
  }[],
  createChat: (formData: FormData) => Promise<void>
}

const ChatList: FC<ChatListProps> = ({chatList, createChat}) => {
  return (
    <div className="relative flex w-full flex-col items-center bottom-0">
      <div className="flex flex-col h-[85dvh] overflow-y-scroll w-full">
        <ChatForm createChat={createChat} />
        <div className="flex flex-col gap-3 mb-12">
          <AskAIButton />
          {chatList && chatList.length > 0 ? (
            chatList.map((chat: ChatData) => (
              <ChatHeader key={chat.id} id={chat.id} href={`/chat/${chat.id}`}>
                {chat.chatTitle}
              </ChatHeader>
            ))
          ) : <></>}
        </div>
      </div>
    </div>
  )
}

export default ChatList