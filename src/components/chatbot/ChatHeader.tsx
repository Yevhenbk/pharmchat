import { FC, ReactNode } from "react"
import Link from "next/link"
import { FaRegTrashAlt } from "react-icons/fa"
import { Url } from "next/dist/shared/lib/router/router"

interface ChatHeaderProps {
  children: ReactNode,
  id: string | number,
  href: Url
}

const ChatHeader: FC<ChatHeaderProps> = ({children, id, href}) => {
  return (
    <Link key={id} href={href} className="border-[1px] border-[#27272A] 
    rounded-md py-3 px-6 hover:cursor-pointer hover:bg-[#27272A] flex 
    justify-between items-center">
      {children}
      <FaRegTrashAlt className="text-gray-500 hover:text-white" />
    </Link>
  )
}

export default ChatHeader