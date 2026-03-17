import type { ChatMessage, CannedResponse } from "@models/chat";
import type { ChatRepository } from "@models/repository";

interface ChatSeed {
  readonly initialMessages: readonly ChatMessage[];
  readonly cannedResponses: readonly CannedResponse[];
  readonly defaultResponse: string;
  readonly getResponse: (userMessage: string) => string;
}

export class InMemoryChatRepository implements ChatRepository {
  private readonly messages: ChatMessage[];
  private readonly cannedResponses: readonly CannedResponse[];
  private readonly defaultResponse: string;
  private readonly getResponse: (userMessage: string) => string;
  private messageCounter = 0;

  constructor(seed: ChatSeed) {
    this.messages = [...seed.initialMessages];
    this.cannedResponses = seed.cannedResponses;
    this.defaultResponse = seed.defaultResponse;
    this.getResponse = seed.getResponse;
  }

  async getMessages(): Promise<readonly ChatMessage[]> {
    return [...this.messages];
  }

  async sendMessage(content: string): Promise<ChatMessage> {
    const userMessage: ChatMessage = {
      id: this.createId(),
      role: "user",
      content,
    };

    this.messages.push(userMessage);

    const response = this.getResponse(content);

    const assistantMessage: ChatMessage = {
      id: this.createId(),
      role: "assistant",
      content: response,
    };

    this.messages.push(assistantMessage);

    return assistantMessage;
  }

  async getCannedResponses(): Promise<
    readonly CannedResponse[]
  > {
    return this.cannedResponses;
  }

  async getDefaultResponse(): Promise<string> {
    return this.defaultResponse;
  }

  private createId(): string {
    this.messageCounter += 1;

    return `msg-${Date.now()}-${this.messageCounter}`;
  }
}
