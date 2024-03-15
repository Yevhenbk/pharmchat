import { FC} from "react"
import Link from "next/link"
import { Url } from "next/dist/shared/lib/router/router"

interface CaptionProps {
  link: Url
  linkText: string
  text: string
}

const Caption: FC<CaptionProps> = ({ link, text, linkText }) => {
  return (
    <div className="absolute bottom-4 w-full flex justify-center items-center">
      <p className="text-xs text-teritaryGray md:w-full w-[60vw] text-center">
        {text} <Link href={link} className="cursor-pointer underline underline-offset-2 
        hover:text-white" target="_blank">{linkText}</Link>
      </p>
    </div>
  )
}

export default Caption