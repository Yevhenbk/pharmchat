export interface ActivityFeedTemplate {
  readonly title: string;
  readonly description: string;
  readonly icon: "call" | "email" | "x";
}

export interface ActivityFeedItem {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: "call" | "email" | "x";
  readonly poNumber: string;
  readonly status: "live" | "done";
  readonly startedAt: number;
  readonly placedAt: string;
}

// A real event emitted by the app (PO sent, emails parsed, etc.)
export interface ActivityLogEvent {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: "email" | "x";
  readonly poNumber: string;
  readonly emittedAt: number;
}
