"use client"

import { FC, ReactNode } from "react"
import Image from "next/image"
import { FaGripLines } from "react-icons/fa"
import { LogoutLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types"
import logo from "../../public/pharmchat.svg"

interface ChatViewProps {
  children: ReactNode,
  user?: KindeUser | null
}

const ChatView: FC<ChatViewProps> = ({children, user}) => {
  const { isAuthenticated } = useKindeBrowserClient()

  const logoutLink = `relative flex items-center justify-center rounded-md text-center
  font-medium h-8 text-xs border-[1px] border-secondaryGray hover:bg-secondaryGray w-20`

  return (
    <div className="relative flex grow flex-col items-center justify-between  text-white 
    bg-black sm:rounded-t-[30px] md:rounded-none md:px-6 md:border-l-[1px] border-secondaryGray w-[100dvvh]
    overflow-hidden">
      <div className="relative flex w-full grow flex-col items-center justify-center gap-4">
        <div className="mt-2 w-full max-w-[440px] h-full flex flex-col justify-between relative">
          <div className="grid px-4 md:px-0">
            <div className="flex cursor-default items-center text-[20px] font-bold leading-none lg:text-[22px] gap-2
            hover:cursor-pointer w-full justify-center mb-6">
              <Image src={logo} className="w-8 h-8 object-cover bg-white" alt="pharmchat image" />
              <p className="text-white font-semibold text-xl">
                Pharmchat
              </p>
            </div>
            {children}
          </div>
          <div className="w-full max-w-[440px] flex flex-col pb-8 border-t-[1px] border-x-[1px] 
          border-secondaryGray md:rounded-md fixed bottom-0 bg-black z-[9]">
            <div className="w-full flex items-center justify-center">
              <FaGripLines  className="text-md text-gray-500 mt-2" />
            </div>
            <div className="w-full flex justify-start gap-6 items-center pt-4 pl-8 h-[60px]">
              {user?.picture && (
                <Image
                  src={user?.picture}
                  alt="Profile picture"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              )}
              {user && !user.picture && (
                <div className="h-[50px] w-[50px] rounded-full bg-zinc-800 text-xl flex justify-center 
                items-center">
                  {user?.given_name?.[0]}
                </div>
              )}
              <div className="flex flex-col items-start gap-3">
                {user?.email && (
                  <p className="text-center text-xs">
                    {user?.email}
                  </p>
                )}
                {isAuthenticated && (
                  <LogoutLink className={logoutLink}>
                    Log out
                  </LogoutLink>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatView