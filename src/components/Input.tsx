import { FC } from "react"
import classNames from "classnames"

interface InputProps {
  type: string,
  name: string,
  placeholder?: string,
  input: "form" | "chat"
}

const Input: FC<InputProps> = ({type, name, placeholder, input}) => {
  return (
    <input type={type} placeholder={placeholder} name={name} spellCheck={false}
    className={classNames("bg-black rounded-md py-4 border-[1px] border-[#27272A]",
    "focus:bg-[#27272A] px-6", {
      "mt-6 w-full z-20  mb-3": input === "chat",
      "text-md font-normal":  input === "form"
    })} />
  )
}

export default Input