"use client"

import { useRef, useEffect, FC } from "react"

interface ChatWindowProps {
  messages?: any
}

const ChatWindow: FC<ChatWindowProps> = ({ messages }) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)
  

  useEffect(() => {

    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight
    }

  }, [messages])

  return (
    <div className="w-[50rem] md:w-[80vw] relative">
      <div className="w-[100%] absolute bottom-[7rem] overflow-y-scroll
      h-[-webkit-fill-available] mt-auto" ref={scrollContainerRef}>
        <div className="mt-8" />
        {/* {messages.map((message, index) => (
          <Message key={index} text={message.text} sender={message.sender} />
        ))} */}
      </div>
    </div>
  )
}

export default ChatWindow