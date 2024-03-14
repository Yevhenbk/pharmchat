import { FC} from "react"
import Link from "next/link"

const Caption: FC = () => {
  return (
    <div className="absolute bottom-4 w-full flex justify-center items-center">
      <p className="text-xs text-teritaryGray md:w-full w-[60vw] text-center">
        Medication information from the <Link href="https://open.fda.gov/apis/"
        className="cursor-pointer underline underline-offset-2 hover:text-white"
        target="_blank">FDA drug label API</Link>
      </p>
    </div>
  )
}

export default Caption