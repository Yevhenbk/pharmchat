"use client"

import { FC } from "react"
import { MessageTypes } from "@/utils/messageTypes"
import { GiHealthCapsule } from "react-icons/gi"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import Image from "next/image"

const Message: FC<MessageTypes> = ({ question, response }) => {
  const { user } = useKindeBrowserClient()

  return (
    <div className="flex flex-col gap-12 text-gray-300 mb-12">
      <div className="flex gap-4 items-start">
        {user?.picture && (
          <Image
            src={user?.picture}
            alt="Profile picture"
            width={30}
            height={30}
            className="rounded-sm"
          />
        )}
        <p className="text-sm md:text-md font-normal">
          {question}
        </p>
      </div>
      <div className="flex gap-4 items-start">
        <div>
          <div className="h-[30px] w-[30px] rounded-sm bg-zinc-800 text-lg 
          font-semibold flex justify-center items-center">
            <GiHealthCapsule />
          </div>
        </div>
        <p className="text-sm md:text-md font-normal">
          {response}
        </p>
      </div>
    </div>
  )
}

export default Message