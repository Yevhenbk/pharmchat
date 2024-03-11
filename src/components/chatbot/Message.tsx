import { FC } from "react"
import { MessageData } from "@/utils/messageData"

const Message: FC<MessageData> = ({ question, response }) => (
  <div className="">
    {question}
    {response}
  </div>
)

export default Message