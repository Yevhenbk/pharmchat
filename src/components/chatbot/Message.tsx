"use client"

import { FC } from "react"
import { MessageData } from "@/utils/messageData"
import StreamingContent from "../StreamingContent"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import Image from "next/image"

const Message: FC<MessageData> = ({ question, response }) => {
  const { user } = useKindeBrowserClient()

  return (
    <div className="flex flex-col gap-12 text-gray-300 mb-12">
      <div className="flex gap-4 items-center">
        {user?.picture && (
          <Image
            src={user?.picture}
            alt="Profile picture"
            width={30}
            height={30}
            className="rounded-sm"
          />
        )}
        <p className="text-md font-normal">
          {question}
        </p>
      </div>
      <div className="flex gap-4 items-start">
        <div>
          <div className="h-[30px] w-[30px] rounded-sm bg-zinc-800 text-lg 
          font-semibold flex justify-center items-center">
            <p>P</p>
          </div>
        </div>
        <p>
          {response}
        </p>
      </div>
    </div>
  )
}

export default Message