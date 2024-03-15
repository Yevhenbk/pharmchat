"use client"

import { FC, useState, ChangeEvent } from "react"
import Input from "../Input"
import Button from "../Button"
import { useModalState } from "../hooks/useModalState"
import { MdOutlineSubdirectoryArrowLeft } from "react-icons/md"

interface SubmitMessageProps {
  id: number,
  handleSubmit?: (
    chatId: number, genericName: string, selectedInfo?: string | null
    ) => Promise<void>
}

const SubmitMessage: FC<SubmitMessageProps> = ({ id, handleSubmit }) => {
  const [inputText, setInputText] = useState<string>("")
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true)
  const [modal, setModal] = useModalState()

  const handleSendClick = (e: any) => {
    e.preventDefault()
    if (inputText.trim() !== "") {
      const splitInput = inputText.split(",")
      const medicationName = splitInput[0].trim()
      const medicationPurpose = splitInput[1]?.trim() || "purpose"

      handleSubmit?.(id, medicationName, medicationPurpose)
      setInputText("")
      setIsButtonDisabled(true)
      setModal(false)
    } else {
      console.log("Please enter a non-empty input.")
      setModal(true)
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value)
    setIsButtonDisabled(e.target.value.trim() === "")
  }

  return (
    <form className="absolute bottom-[3rem] flex flex-row text-white
    justify-between gap-0 w-[80vw] md:w-[50rem]">
      <Input type="text" input="chat" placeholder="Ex. Ibuprofen, purpose..."
      value={inputText} onChange={handleInputChange} />
      <div className="absolute z-30 top-3 right-3">
        <Button type="submit" height={8} width="2rem" background="white"
        onClick={handleSendClick} ariaLabel="Submit Message" disabled={isButtonDisabled}>
          <MdOutlineSubdirectoryArrowLeft  className="text-lg" />
        </Button>
      </div>
    </form>
  )
}

export default SubmitMessage