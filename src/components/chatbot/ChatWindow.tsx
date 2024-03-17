"use client"

import { FC, useEffect, useRef } from "react"
import Message from "./Message"
import AIResponse from "./AIResponse"
import Modal from "../Modal"
import { Message as MessageAIData } from "ai/react"
import { MessageTypes as MessageAPIData } from "@/utils/messageTypes"

interface ChatWindowProps {
  messages: (MessageAPIData | MessageAIData)[]
  modalTitle: string
  modalDescription: string
  modalResponse: string
}

const ChatWindow: FC<ChatWindowProps> = ({ 
  messages, modalTitle, modalDescription, modalResponse 
}) => {
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
      {messages.length > 0 ?
        messages.map((message) => {
          if ("question" in message) {
            const apiMessage = message as MessageAPIData
            return (
              <Message key={apiMessage.id} response={apiMessage.response} 
              question={apiMessage.question} />
            )
          } else {
            const aiMessage = message as MessageAIData
            return (
              <AIResponse key={aiMessage.id} message={aiMessage} />
            )
          }
        }) :
        <Modal>
          <div className="flex w-full flex-col gap-4">
            <h4 className="font-bold text-base md:text-lg text-white">
              {modalTitle}
            </h4>
            <p className="font-medium text-teritaryGray text-xs 
            md:text-base">
              {modalDescription}
            </p>
            <p className="font-medium text-teritaryGray text-xs 
            md:text-base">
              {modalResponse}
            </p>
          </div>
        </Modal>
      }
    </div>
  )
}

export default ChatWindow