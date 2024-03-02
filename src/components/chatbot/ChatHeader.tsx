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
    <Link key={id} href={href} className="border-[1px] border-[#27272A] 
    rounded-md py-3 px-6 hover:cursor-pointer hover:bg-[#27272A] flex 
    justify-between items-center z-[1]">
      {children}
      <FaRegTrashAlt className="text-gray-500 hover:text-white z-[9]" onClick={() => deleteChat(id)} />
    </Link>
  )
}

export default ChatHeader