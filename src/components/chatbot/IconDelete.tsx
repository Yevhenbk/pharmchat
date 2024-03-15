import { FC } from "react"
import { FaRegTrashAlt } from "react-icons/fa"
import { deleteChat } from "@/actions/actions"

interface IconDeleteProps {
  id: number
}

const IconDelete: FC<IconDeleteProps> = ({ id }) => {
  return (
    <button className="absolute right-0 top-0 w-20 flex items-center justify-center 
    h-[49.6px] border-[1px] border-secondaryGray z-[9] hover:bg-white rounded-e-md
    hover:text-red-600 hover:cursor-pointer" onClick={() => deleteChat(id)} type="button"
    aria-label="Delete Chat">
      <FaRegTrashAlt />
    </button>
  )
}

export default IconDelete