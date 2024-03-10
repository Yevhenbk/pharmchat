import { FC } from "react"
import classNames from "classnames"

interface InputProps {
  type: string,
  name?: string,
  placeholder?: string,
  input: "form" | "chat"
}

const Input: FC<InputProps> = ({type, name, placeholder, input}) => {
  return (
    <input type={type} placeholder={placeholder} name={name} spellCheck={false}
    className={classNames("bg-black rounded-md py-4 border-[1px] border-secondaryGrey",
    "focus:bg-secondaryGrey px-6 z-[9]", {
      "w-full  mb-3": input === "chat",
      "text-md font-normal":  input === "form"
    })} />
  )
}

export default Input