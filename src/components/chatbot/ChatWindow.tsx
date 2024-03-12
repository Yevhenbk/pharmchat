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
    // Scroll to the bottom when messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    // Scroll to the bottom on initial render
    scrollToBottom();
  }, []);

  useEffect(() => {
    // Scroll to the bottom when messages change
    scrollToBottom();
  }, [messages]);

  return (
    <div className="w-[80vw] md:w-[50rem] relative overflow-y-scroll pt-20
    pb-40 text-white  h-[-webkit-fill-available] mt-auto" ref={chatContainerRef}>
        {messages && Array.isArray(messages) ? (
          messages.map((message: MessageData) => (
          <Message key={message.id} response={message.response} question={message.question} />
        ))) : <></>}
    </div>
  )
}

export default ChatWindow