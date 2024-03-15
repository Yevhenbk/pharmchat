"use client"

import { FC, useState, ChangeEvent } from "react"
import Input from "../Input"
import Button from "../Button"
import { MdOutlineSubdirectoryArrowLeft } from "react-icons/md"

interface SubmitMessageProps {
  id: number,
  handleSubmit?: (
    chatId: number, genericName: string, selectedInfo?: string | null
    ) => Promise<"jsonData" | undefined>
}

const SubmitMessage: FC<SubmitMessageProps> = ({id, handleSubmit}) => {
  const [inputText, setInputText] = useState<string>("")
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true)

  const handleSendClick = (e: any) => {
    e.preventDefault()
    if (inputText.trim() !== "") {
      const splitInput = inputText.split(",")
      if (splitInput.length !== 2) {
        console.log("Please enter the input in the format: 'MedicationName, Purpose'")
        // Display a message to the user indicating the proper input format
        return
      }
  
      const [medicationName, medicationPurpose] = splitInput
      handleSubmit?.(id, medicationName.trim(), medicationPurpose.trim())
      setInputText("")
    } else {
      console.log("Please enter a non-empty input.")
      // Display a message to the user indicating to enter a non-empty input
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