export interface GmailEmail {
  readonly id: string;
  readonly threadId: string;
  readonly from: string;
  readonly to: string;
  readonly subject: string;
  readonly body: string;
  readonly bodyHtml?: string;
  readonly date: string;
  readonly snippet: string;
}
