import { FC } from "react"
import Message from "./Message"
import { MessageData } from "@/utils/messageData"

interface ChatWindowProps {
  messages: MessageData[]
}

const ChatWindow: FC<ChatWindowProps> = ({ messages }) => {
  return (
    <div className="w-[80vw] md:w-[50rem] relative overflow-y-scroll h-full pt-20
    pb-40 text-white">
        {messages && Array.isArray(messages) ? (
          messages.map((message: MessageData) => (
          <Message key={message.id} response={message.response} question={message.question} />
        ))) : <></>}
    </div>
  )
}

export default ChatWindow