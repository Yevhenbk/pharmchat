"use client"

import { FC, useState, ChangeEvent } from "react"
import Input from "../Input"
import Button from "../Button"
import { MdOutlineSubdirectoryArrowLeft } from "react-icons/md"

interface SubmitMessageProps {
  id: number,
  handleSubmit?: any
}

const SubmitMessage: FC<SubmitMessageProps> = ({id, handleSubmit}) => {
  const [inputText, setInputText] = useState<string>("")

  const handleSendClick = (e: any) => {
    e.preventDefault()
    if (inputText.trim() !== "") {
      const [medicationName, medicationPurpose] = inputText.split(",")

      handleSubmit(id, medicationName.trim(), medicationPurpose.trim())

      setInputText("")
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value)
  }

  return (
    <form className="absolute bottom-[3rem] flex flex-row text-white
    justify-between gap-0 w-[80vw] md:w-[50rem]">
      <Input type="text" input="chat" placeholder="Ex. Ibuprofen, purpose..."
      value={inputText} onChange={handleInputChange} />
      <div className="absolute z-30 top-3 right-3">
        <Button type="submit" height={8} width="2rem" background="white"
        onClick={handleSendClick}>
          <MdOutlineSubdirectoryArrowLeft  className="text-lg" />
        </Button>
      </div>
    </form>
  )
}

export default SubmitMessage