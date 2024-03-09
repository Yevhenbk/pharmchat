import { FC, ReactNode } from "react"
import ContentRotator from "./ContentRotator"
import Image from "next/image"
import Link from "next/link"
import logo from "../../public/logo.svg"

interface ViewWrapperProps {
  children: ReactNode
}

const ViewWrapper: FC<ViewWrapperProps> = ({children}) => {
  return (
    <main className="flex min-h-full w-screen flex-col sm:supports-[min-height:100dvh]:min-h-[100dvh] 
    md:grid md:grid-cols-2 lg:grid-cols-[60%_40%]">
      <div className="relative hidden flex-1 flex-col justify-center px-5 pt-8 md:flex md:px-6 
      md:py-[22px] lg:px-8 bg-[#18181A]">
        <nav className="left-0 top-8 flex w-full px-6 sm:absolute md:top-[22px] md:px-6 lg:px-8">
          <Link className="flex cursor-default items-center text-[20px] font-bold leading-none lg:text-[22px] gap-2
          hover:cursor-pointer" href="/">
            <Image src={logo} className="w-8 h-8 object-cover bg-white" alt="pharmchat image" />
            <p className="text-white font-semibold text-xl">
              Pharmchat
            </p>
          </Link>
        </nav>
        <div className="flex justify-center items-center">
          <div className="flex flex-col gap-4 text-white items-start justify-center text-start">
            <h1 className="font-semibold text-3xl max-w-[40rem] w-[640px]">
              <ContentRotator />
            </h1>
          </div>
        </div>
      </div>
      {children}
    </main>
  )
}

export default ViewWrapper