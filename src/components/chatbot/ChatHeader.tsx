"use client"

import { FC, ReactNode } from "react"
import Link from "next/link"
import { Url } from "next/dist/shared/lib/router/router"
import IconDelete from "./IconDelete"

interface ChatHeaderProps {
  children: ReactNode,
  id: number,
  href: Url
}

const ChatHeader: FC<ChatHeaderProps> = ({ children, id, href }) => {
  return (
    <div key={id}  className="flex relative w-full rounded-md overflow-hidden">
      <Link href={href} className="border border-secondaryGray 
      py-3 px-6 hover:cursor-pointer hover:bg-secondaryGray flex rounded-md
      justify-between items-center z-[1] relative w-full">
        {children}
      </Link>
      <IconDelete id={id} />
    </div>
  )
}

export default ChatHeader