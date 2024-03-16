import { FC, ReactNode } from "react"

interface ModalProps {
  children: ReactNode
}

const Modal: FC<ModalProps> = ({ children }) => {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-secondaryGray 
    bg-background p-8">
      {children}
    </div>
  )
}

export default Modal