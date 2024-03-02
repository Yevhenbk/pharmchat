import { FC, ChangeEventHandler } from "react"
import classNames from "classnames"

interface InputProps {
  onChange: ChangeEventHandler<HTMLInputElement>,
  type: string,
  name: string,
  value: string,
  placeholder?: string,
  input: "form" | "chat"
}

const Input: FC<InputProps> = ({onChange, type, name, value, placeholder, input}) => {
  return (
    <input type={type} onChange={onChange} value={value} placeholder={placeholder} name={name}
    className={classNames("bg-black rounded-md py-4 border-[1px] border-[#27272A]",
    "focus:bg-[#27272A] px-6", {
      "mt-6 w-full z-20  mb-3": input === "chat",
      "text-md font-normal":  input === "form"
    })} />
  )
}

export default Input