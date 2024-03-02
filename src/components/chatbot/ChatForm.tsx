import { FC } from "react"
import { MdOutlineSubdirectoryArrowLeft } from "react-icons/md"
import Input from "../Input"
import Button from "../Button"

interface ChatFormProps {
  createChat?: any
}

const ChatForm: FC<ChatFormProps> = ({ createChat }) => {

  return (
    <form action={createChat} className="sticky top-0 left-0">
      <Input
        name="chatTitle"
        type="text"
        placeholder="Chat title"
        input="chat"
      />
      <div className="absolute z-30 top-8 right-2">
        <Button type="submit" height={10} width="2.5rem" background="white">
          <MdOutlineSubdirectoryArrowLeft  className="text-xl" />
        </Button>
      </div>
    </form>
  )
}

export default ChatForm
