"use client"

import React, { FC } from "react"
import Input from "../Input"

const SubmitMessage: FC = () => {
  return (
    <form className="absolute bottom-[3rem] flex flex-row
    justify-between gap-0 w-[80vw] md:w-[50rem]">
      <Input type="text" input="chat" placeholder="Medicine, 
      desired output (Ex. Ibuprofen, purpose)"  />
    </form>
  )
}

export default SubmitMessage