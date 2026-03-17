export const MODAL_MODES = [
  "po-queue",
  "critical",
  "warning",
  "fyi",
] as const;

export type ModalMode = (typeof MODAL_MODES)[number];

export interface ModalClosedState {
  readonly mode: "closed";
}

export interface ModalOpenState {
  readonly mode: ModalMode;
  readonly actionId?: string;
}

export type ModalState = ModalClosedState | ModalOpenState;

export const MODAL_TITLES: Record<ModalMode, string> = {
  "po-queue": "PO Queue",
  critical: "Critical Action",
  warning: "Warning",
  fyi: "FYI",
} as const;
