"use client"

import { useChat } from "ai/react"
import { FC, FormEvent } from "react"
import prisma from "@/lib/db"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { addMessage } from "@/actions/clientActions"
import symptomsKeywords from "@/utils/symptomsKeywords"

interface AIProps {
  chatId: number,
  messagesId: any
}
 
const AI: FC<AIProps> = ({chatId, messagesId}) => {
  const { messages, input, handleInputChange, handleSubmit } = useChat()

  const { isAuthenticated, user } = useKindeBrowserClient()

  const isHealthRelated = (input:any) => {
    const lowercasedInput = input.toLowerCase()
    return symptomsKeywords.some(keyword => lowercasedInput.includes(keyword))
  }

  const handleHealthSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    const latestMessage = messages[messages.length - 1]

    if (isHealthRelated(input)) {
      await handleSubmit(e)
      console.log(messages)

      await prisma.message.create({
        data: {
          chat: {
            connect: {
              id: chatId as number,
            },
          },
          kindeAuthId: user?.id as string,
          question: input,
          response: latestMessage.content
          }
        }) // Pass the event to handleSubmit
    } else {
      // Handle non-health-related input (you can display a message, clear the input, etc.)
      console.log("Please ask a health-related question.")
    }
  }
  const latestMessage = messages[messages.length - 1]

  // const chat = prisma.chat.findMany({
  //   where: {
  //     kindeAuthId: user?.id,
  //   },
  // })

  return (
    <div className="mx-auto w-full max-w-md py-24 flex flex-col stretch">
      {messages.map((m: any) => (
        <div key={m.id}>
          {m.role === "user" ? "User: " : "AI: "}
          {m.content}
        </div>
      ))}

      <form onSubmit={handleHealthSubmit}>
      <button onClick={() => console.log(latestMessage)}>messages</button>
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

export default AI