import { FC, ReactNode, MouseEventHandler } from "react"
import classNames from "classnames"

interface ButtonProps {
  children: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
  type?: "submit" | "reset" | "button" | undefined
  height: 12 | 8
  width?: string
  background: "white" | "transparent"
  ariaLabel: string
  disabled?: boolean
}

const Button: FC<ButtonProps> = ({ 
  children, onClick, type, height, width, background, ariaLabel, disabled 
}) => {
  return (
    <button className={classNames("relative flex items-center justify-center rounded-md text-center", 
    "font-medium disabled:hover:cursor-default disabled:opacity-65", {
      "h-12 text-base bg-white text-black hover:bg-buttonHover disabled:bg-zinc-50": 
        height === 12 && background === "white",
      "h-8 text-xs bg-white text-black hover:bg-buttonHover disabled:bg-zinc-50": 
        height === 8 && background === "white",
      "h-8 text-xs border-[1px] border-secondaryGray hover:bg-secondaryGray": 
        height === 8 && background === "transparent",
    })} onClick={onClick} type={type} style={{ width: width}} aria-label={ariaLabel} disabled={disabled}>
      {children}
    </button>
  )
}

export default Button