import { FC } from "react"
import { SiWorldhealthorganization } from "react-icons/si"
import Link from "next/link"

const AskAIButton: FC = () => {
  return (
    <Link className="border-[1px] border-secondaryGrey flex justify-between
    py-3 px-6 hover:cursor-pointer hover:bg-secondaryGrey rounded-md" href="/">
      Ask AI
      <SiWorldhealthorganization className="text-2xl" />
    </Link>
  )
}

export default AskAIButton