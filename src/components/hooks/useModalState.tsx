import { useState, Dispatch, SetStateAction } from "react"

export const useModalState = (): [boolean, Dispatch<SetStateAction<boolean>>] => {
  const [modal, setModal] = useState<boolean>(false)

  return [modal, setModal]
}