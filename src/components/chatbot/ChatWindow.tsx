"use client"

import { FC, useEffect, useRef } from "react"
import Message from "./Message"
import { MessageData } from "@/utils/messageData"

interface ChatWindowProps {
  messages: MessageData[]
}

const ChatWindow: FC<ChatWindowProps> = ({ messages }) => {
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }

  useEffect(() => {
    scrollToBottom()
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className="w-[65vw] md:w-[45rem] relative overflow-y-scroll pt-16 pb-6
    mb-28 text-white  h-[-webkit-fill-available]" ref={chatContainerRef}>
        {messages && Array.isArray(messages) ? (
          messages.map((message: MessageData) => (
          <Message key={message.id} response={message.response} question={message.question} />
        ))) : <></>}
    </div>
  )
}

export default ChatWindow