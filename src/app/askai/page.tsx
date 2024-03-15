"use client"

import { useChat } from "ai/react"
import { FC, FormEvent, useState, ChangeEvent } from "react"
import { MdOutlineSubdirectoryArrowLeft } from "react-icons/md"
import ChatWindow from "@/components/chatbot/ChatWindow"
import LogoNav from "@/components/LogoNav"
import Input from "@/components/Input"
import Button from "@/components/Button"
import symptomsKeywords from "@/utils/symptomsKeywords"
import Caption from "@/components/Caption"
import logo from "../../../public/logo.svg"
 
const Page: FC = () => {
  const { messages, input, handleInputChange, handleSubmit } = useChat()
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true)

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

  const handleInputChangeAndCheck = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.currentTarget.value
    handleInputChange(e)
    setIsButtonDisabled(!isHealthRelated(inputValue))
  }

  return (
    <div className="bg-black h-[100dvh] w-full flex flex-col justify-between
    items-center">
      <LogoNav logo={logo} />
      <ChatWindow messages={messages} />
      <form className="absolute bottom-[3rem] flex flex-row text-white
      justify-between gap-0 w-[80vw] md:w-[50rem]" onSubmit={handleHealthSubmit}>
        <Input type="text" input="chat" placeholder="Ex. Ibuprofen, purpose..."
        value={input} onChange={handleInputChangeAndCheck} />
        <div className="absolute z-30 top-3 right-3">
          <Button type="submit" height={8} width="2rem" background="white" disabled={isButtonDisabled}
          ariaLabel="Submit Message">
            <MdOutlineSubdirectoryArrowLeft  className="text-lg" />
          </Button>
        </div>
      </form>
      <Caption link="https://github.com/LAION-AI/Open-Assistant" linkText="Open Assistant AI"
      text="This chat won't be saved - " />
    </div>
  )
}

export default Page