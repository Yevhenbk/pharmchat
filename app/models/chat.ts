export const CHAT_ROLES = ["user", "assistant"] as const;
export type ChatRole = (typeof CHAT_ROLES)[number];

export interface ChatMessage {
  readonly id: string;
  readonly role: ChatRole;
  readonly content: string;
}

export interface CannedResponse {
  readonly id: string;
  readonly keywords: string;
  readonly response: string;
}
