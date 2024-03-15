"use client"

import { useChat } from "ai/react"
import { FC, FormEvent } from "react"
import symptomsKeywords from "@/utils/symptomsKeywords"
 
const AskAI: FC = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat()

  const isHealthRelated = (input:any) => {
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
    <div className="mx-auto w-full max-w-md py-24 flex flex-col stretch">
      {messages.map(m => (
        <div key={m.id}>
          {m.role === "user" ? "User: " : "AI: "}
          {m.content}
        </div>
      ))}

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

export default AskAI