import { FC } from "react"
import Message from "./Message"

interface ChatWindowProps {
  messages?: any
}

const ChatWindow: FC<ChatWindowProps> = ({ messages }) => {
  // const scrollContainerRef = useRef<HTMLDivElement | null>(null)
  

  // useEffect(() => {

  //   if (scrollContainerRef.current) {
  //     scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight
  //   }

  // }, [messages])

  return (
    <div className="w-[80vw] md:w-[50rem] relative">
        {messages.map((message: any) => (
          <Message key={message.id} response={message.response} question={message.question} />
        ))}
    </div>
  )
}

export default ChatWindow