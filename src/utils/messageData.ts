export interface MessageData {
  id?: number
  kindeAuthId?: string
  question: string | false
  response: string | false
  chatId?: number
  role?: "user" | "assistant"
  content?: string
}