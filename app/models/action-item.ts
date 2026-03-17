export const ACTION_ITEM_TYPES = [
  "order-cancelled",
  "delayed",
  "partial-fill",
  "sku-backordered",
  "not-confirmed",
  "price-increase",
  "price-decrease",
  "arriving-early",
  "demand-surge",
] as const;

export type ActionItemType = (typeof ACTION_ITEM_TYPES)[number];

export const SEVERITIES = ["critical", "warning", "fyi"] as const;

export type Severity = (typeof SEVERITIES)[number];

export interface ActionItemAction {
  readonly label: string;
}

export interface ActionItemData {
  readonly id: string;
  readonly type: ActionItemType;
  readonly severity: Severity;
  readonly title: string;
  readonly description: string;
  readonly actions: readonly ActionItemAction[];
  readonly ignoreLabel?: string;
  readonly timeAgo?: string;
}
