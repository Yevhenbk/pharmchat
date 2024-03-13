"use client"

import { FC } from "react"
import { MessageData } from "@/utils/messageData"
import StreamingContent from "../StreamingContent"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import Image from "next/image"

const Message: FC<MessageData> = ({ question, response }) => {
  const { user } = useKindeBrowserClient()

  return (
    <div className="flex flex-col gap-4 text-gray-100">
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
        <p>{question}</p>
      </div>
      
      <p>{response}</p>
      {/* <StreamingContent content={[response]} loop={false} /> */}
    </div>
  )
}

export default Message