import { FC, ChangeEventHandler, KeyboardEventHandler } from "react"
import classNames from "classnames"

interface InputProps {
  type: string
  name?: string
  value?: string
  onKeyDown?: KeyboardEventHandler<HTMLInputElement> | undefined
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined
  placeholder?: string
  input: "form" | "chat"
}

const Input: FC<InputProps> = ({
  type, name, placeholder, input, value, onChange, onKeyDown
}) => {
  return (
    <input type={type} placeholder={placeholder} name={name} spellCheck={false} value={value}
    onChange={onChange} onKeyDown={onKeyDown} className={classNames("rounded-md py-4",
    "border-[1px] border-secondaryGray focus:bg-secondaryGray px-6 z-[9]", {
      "w-full  mb-3 bg-black": input === "chat",
      "text-md font-normal bg-black":  input === "form"
    })} />
  )
}

export default Input