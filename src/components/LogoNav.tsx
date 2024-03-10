import { FC } from "react"
import Link from "next/link"
import Image from "next/image"
import logo from "../../public/logo.svg"

const LogoNav: FC = () => {
  return (
    <nav className="left-0 top-8 flex w-full px-6 sm:absolute md:top-[22px] md:px-6 lg:px-8">
      <Link className="flex cursor-default items-center text-[20px] font-bold leading-none lg:text-[22px] gap-2
      hover:cursor-pointer" href="/">
        <Image src={logo} className="w-8 h-8 object-cover bg-white" alt="pharmchat image" />
        <p className="text-white font-semibold text-xl">
          Pharmchat
        </p>
      </Link>
    </nav>
  )
}

export default LogoNav