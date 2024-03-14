"use client"

import { useChat } from "ai/react"
import { FC, FormEvent } from "react"
import ChatWindow from "@/components/chatbot/ChatWindow"
import LogoNav from "@/components/LogoNav"
import symptomsKeywords from "@/utils/symptomsKeywords"
import logo from "../../../public/logo.svg"
 
const Page: FC = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat()

  const isHealthRelated = (input: string) => {
    const lowercasedInput = input.toLowerCase()
    return symptomsKeywords.some(keyword => lowercasedInput.includes(keyword))
  }

  const handleHealthSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (isHealthRelated(input)) {
      handleSubmit(e)
    } else {
      console.log("Please ask a health-related question.")
    }
  }

  return (
    <div className="bg-black h-[100dvh] w-full flex flex-col justify-between
    items-center">
      <LogoNav logo={logo} />
      <ChatWindow messages={messages} />

      <form onSubmit={handleHealthSubmit}>
        <label>
          Say something...
          <input
            className="fixed w-full max-w-md bottom-0 border border-gray-300 rounded mb-8 shadow-xl p-2"
            value={input}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Send</button>
      </form>
    </div>
  )
}

export default Page