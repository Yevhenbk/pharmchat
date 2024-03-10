import { FC } from "react"
import { MdOutlineSubdirectoryArrowLeft } from "react-icons/md"
import Input from "../Input"
import Button from "../Button"

interface ChatFormProps {
  createChat: (formData: FormData) => Promise<void>
}

const ChatForm: FC<ChatFormProps> = ({ createChat }) => {

  return (
    <form action={createChat} className="relative top-0 left-0">
      <Input
        name="chatTitle"
        type="text"
        placeholder="Chat title"
        input="chat"
      />
      <div className="absolute z-30 top-3 right-3">
        <Button type="submit" height={8} width="2rem" background="white">
          <MdOutlineSubdirectoryArrowLeft  className="text-lg" />
        </Button>
      </div>
    </form>
  )
}

export default ChatForm
