export const SHORTAGE_STATUSES = ["active", "resolved"] as const;

export type ShortageStatus = (typeof SHORTAGE_STATUSES)[number];

export interface DrugShortage {
  readonly genericName: string;
  readonly reason: string;
  readonly status: ShortageStatus;
}

/*
 * Maps raw FDA API status strings to our internal ShortageStatus type.
 * FDA statuses: "Current", "To Be Discontinued", "Resolved", etc.
 * Anything that is not explicitly resolved is treated as active.
 */
export function mapFdaStatus(rawStatus: string): ShortageStatus {
  const lower = rawStatus.toLowerCase();

  if (lower === "resolved") {
    return "resolved";
  }

  return "active";
}
