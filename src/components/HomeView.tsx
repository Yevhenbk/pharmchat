import { FC, ReactNode } from 'react'
import Image from "next/image"
import Link from "next/link"
import pharmchat from "../../public/pharmchat.svg"

interface HomeViewProps {
  children: ReactNode
}

const HomeView: FC<HomeViewProps> = ({children}) => {
  return (
    <div className="relative flex grow flex-col items-center justify-between px-5 py-8 text-white 
    bg-black sm:rounded-t-[30px] md:rounded-none md:px-6 md:border-l-[1px] border-secondaryGray">
      <div className="relative flex w-full grow flex-col items-center justify-center gap-4">
        <h2 className="text-center text-xl leading-[1.2] md:text-2xl md:leading-8 font-bold">
          Get Started
        </h2>
        <p className="text-center text-sm leading-[1.2] md:text-md md:leading-4 text-teritaryGray font-medium
        mb-4 w-[80%]">
          This is an open source AI chatbot app template built with Next.js, Open Assistant AI, and Prisma.
        </p>
        <div className="mt-2 w-full max-w-[440px]">
          <div className="grid gap-x-3 gap-y-2 sm:grid-cols-2 sm:gap-y-0">
            {children}
          </div>
        </div>
      </div>
      <div className="mt-10 flex flex-col justify-center text-teritaryGray">
        <div className="flex justify-center text-gray-300 md:mb-3 gap-2 items-center">
          <Image src={pharmchat} className="w-6 h-6 object-cover bg-gray-300" alt="Logo image" />
          <p className="text-gray-300 font-normal text-md">
            Pharmchat
          </p>
        </div>
        <div className="flex gap-3 py-3 text-xs">
          <Link className="cursor-pointer font-normal underline underline-offset-2 hover:text-white" href="" 
          rel="noreferrer">
            Terms of use
          </Link>
          <span className="text-token-text-tertiary">|</span>
          <Link className="cursor-pointer font-normal underline underline-offset-2 hover:text-white" href="" 
          rel="noreferrer">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomeView