import { FC, ReactNode, MouseEventHandler } from "react"
import classNames from "classnames"

interface ButtonProps {
  children: ReactNode,
  onClick?: MouseEventHandler<HTMLButtonElement>,
  type?: "submit" | "reset" | "button" | undefined,
  height: 12 | 8,
  width?: string,
  background: "white" | "transparent"
}

const Button: FC<ButtonProps> = ({children, onClick, type, height, width, background}) => {
  return (
    <button className={classNames("relative flex items-center justify-center rounded-md text-center", 
    "font-medium", {
      "h-12 text-base bg-[#ffffff] text-black hover:bg-[#bbbbbb] disabled:bg-zinc-50": 
        height === 12 && background === "white",
      "h-8 text-xs bg-[#ffffff] text-black hover:bg-[#bbbbbb] disabled:bg-zinc-50": 
        height === 8 && background === "white",
      "h-8 text-xs border-[1px] border-[#27272a] hover:bg-[#27272A]": 
        height === 8 && background === "transparent",
    })} onClick={onClick} type={type} style={{ width: width}}>
      {children}
    </button>
  )
}

export default Button