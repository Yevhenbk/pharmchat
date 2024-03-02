import { FC } from "react"
import { FaGripLines  } from "react-icons/fa"
import ChatHeader from "./ChatHeader"
import ChatForm from "./ChatForm"

interface ChatListProps {
  chatList: any,
  createChat: any
}

const ChatList: FC<ChatListProps> = ({chatList, createChat}) => {
  return (
    <div className="relative flex f-full flex-col items-center">
      <div className="flex flex-col h-[55dvh] overflow-y-scroll w-full">
        <ChatForm createChat={createChat} />
        <div className="flex flex-col gap-3 mb-12">
          {chatList && chatList.length > 0 ? (
            chatList.map((chat: any) => (
              <ChatHeader key={chat.id} id={chat.id} href={chatList}>
                {chat.chatTitle}
              </ChatHeader>
            ))
          ) : <>Pepa</>}
        </div>
      </div>
      <div className="w-full bg-black absolute -bottom-0 flex justify-center rounded-t-md">
        <FaGripLines  className="text-xl text-gray-500" />
      </div>
    </div>
  )
}

export default ChatList