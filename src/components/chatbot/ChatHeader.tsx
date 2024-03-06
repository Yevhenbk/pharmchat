"use client"

import { FC, ReactNode } from "react"
import Link from "next/link"
import { FaRegTrashAlt } from "react-icons/fa"
import { Url } from "next/dist/shared/lib/router/router"
import { deleteChat } from "@/actions/actions"

interface ChatHeaderProps {
  children: ReactNode,
  id: number,
  href: Url
}

const ChatHeader: FC<ChatHeaderProps> = ({children, id, href}) => {
  return (
    <div key={id}  className="flex relative w-full rounded-md overflow-hidden">
      <Link href={href} className="border-[1px] border-[#27272A] 
      py-3 px-6 hover:cursor-pointer hover:bg-[#27272A] flex rounded-md
      justify-between items-center z-[1] relative w-full">
        {children}
      </Link>
      <span className="absolute right-0 top-0 w-20 flex items-center justify-center 
      h-[49.6px] border-[1px] border-[#27272A] z-[9] hover:bg-white rounded-e-md
      hover:text-red-600 hover:cursor-pointer" onClick={() => deleteChat(id)}>
        <FaRegTrashAlt />
      </span>
    </div>
  )
}

export default ChatHeader