"use client"

import { FC, useEffect, useRef } from "react"
import Message from "./Message"
import AIResponse from "./AIResponse"
import { Message as MessageAIData } from "ai/react"
import { MessageTypes as MessageAPIData } from "@/utils/messageTypes"

interface ChatWindowProps {
  messages: (MessageAPIData | MessageAIData)[]
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
    <div className="w-[80vw] md:w-[45rem] relative overflow-y-scroll pt-16 pb-6
    mb-28 text-white  h-[-webkit-fill-available]" ref={chatContainerRef}>
      {messages.map((message) => {
        if ("question" in message) {
          const apiMessage = message as MessageAPIData
          return (
            <Message key={apiMessage.id} response={apiMessage.response} question={apiMessage.question} />
          )
        } else {
          const aiMessage = message as MessageAIData
          return (
            <AIResponse message={aiMessage} />
          )
        }
      })}
    </div>
  )
}

export default ChatWindow