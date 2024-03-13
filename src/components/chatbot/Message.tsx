import { FC } from "react"
import { MessageData } from "@/utils/messageData"
import StreamingContent from "../StreamingContent"

const Message: FC<MessageData> = ({ question, response }) => (
  <div className="flex flex-col gap-4">
    <p>{question}</p>
    <p>{response}</p>
    {/* <StreamingContent content={[response]} loop={false} /> */}
  </div>
)

export default Message