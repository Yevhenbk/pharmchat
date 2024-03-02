import { FC } from "react"
import ChatHeader from "./ChatHeader"
import ChatForm from "./ChatForm"

interface ChatListProps {
  chatList: any,
  createChat: any
}

const ChatList: FC<ChatListProps> = ({chatList, createChat}) => {
  return (
    <div className="relative flex w-full flex-col items-center bottom-0">
      <div className="flex flex-col h-[65dvh] overflow-y-scroll w-full">
        <ChatForm createChat={createChat} />
        <div className="flex flex-col gap-3 mb-12">
          {chatList && chatList.length > 0 ? (
            chatList.map((chat: any) => (
              <ChatHeader key={chat.id} id={chat.id} href={chatList}>
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