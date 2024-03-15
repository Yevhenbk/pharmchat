import { FC } from "react"
import { Message } from "ai/react"
import { GiHealthCapsule } from "react-icons/gi"
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import Image from "next/image"

interface AIResponseProps {
  message: Message
}

const AIResponse: FC<AIResponseProps> = ({ message }) => {
  const { user } = useKindeBrowserClient()

  return (
    <div className="flex flex-col gap-12 text-gray-300 mb-12" key={message.id}>
      <div className="flex gap-4 items-start">
        {message.role === "user" && user?.picture ? (
          <Image
            src={user?.picture}
            alt="Profile picture"
            width={30}
            height={30}
            className="rounded-sm"
          />
        ) : (
          <div>
            <div className="h-[30px] w-[30px] rounded-sm bg-zinc-800 text-lg 
            font-semibold flex justify-center items-center">
              <GiHealthCapsule />
            </div>
          </div>
        )}
        <p className="text-sm md:text-md font-normal">
          {message.content}
        </p>
      </div>
    </div>
  )
}

export default AIResponse