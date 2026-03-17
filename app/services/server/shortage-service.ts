import "server-only";

import type { DrugShortage } from "@models/shortage";
import { mapFdaStatus } from "@models/shortage";

const FDA_SHORTAGES_URL = "https://api.fda.gov/drug/shortages.json";
const FDA_FETCH_LIMIT = 100;

interface FdaShortageRecord {
  readonly generic_name?: string;
  readonly status?: string;
  readonly reason_for_shortage?: string;
}

interface FdaShortagesResponse {
  readonly results?: readonly FdaShortageRecord[];
}

/*
 * Fallback demo data used when the FDA API is unavailable or unconfigured.
 * Reflects common drug shortages for demo purposes only.
 */
const FALLBACK_SHORTAGE_LIST: readonly DrugShortage[] = [
  {
    genericName: "Amoxicillin",
    reason:
      "Active Pharmaceutical Ingredient (API) shortage at primary manufacturer",
    status: "active",
  },
  {
    genericName: "Azithromycin",
    reason: "Increased demand due to seasonal respiratory illness surge",
    status: "active",
  },
  {
    genericName: "Doxycycline",
    reason: "Manufacturing capacity constraints at two major facilities",
    status: "active",
  },
  {
    genericName: "Insulin Glargine",
    reason: "Cold-chain distribution disruption affecting regional supply",
    status: "active",
  },
  {
    genericName: "Amoxicillin/Clavulanate",
    reason: "Downstream API shortage from Amoxicillin supply constraint",
    status: "active",
  },
];

function mapFdaRecord(record: FdaShortageRecord): DrugShortage | undefined {
  if (!record.generic_name) {
    return undefined;
  }

  return {
    genericName: record.generic_name,
    reason: record.reason_for_shortage ?? "Reason not specified",
    status: mapFdaStatus(record.status ?? ""),
  };
}

export class ShortageService {
  static async fetchCurrentShortages(): Promise<readonly DrugShortage[]> {
    const apiKey = process.env.FDA_API_KEY;

    if (!apiKey) {
      console.warn(
        "[ShortageService] FDA_API_KEY not set — using fallback demo data",
      );

      return FALLBACK_SHORTAGE_LIST.filter((s) => s.status === "active");
    }

    const url = `${FDA_SHORTAGES_URL}?api_key=${apiKey}&limit=${FDA_FETCH_LIMIT}`;

    const response = await fetch(url, {
      next: { revalidate: 3600 },
    });

    console.warn(`[ShortageService] FDA API status: ${response.status}`);

    if (!response.ok) {
      console.warn(
        `[ShortageService] FDA API error ${response.status} — using fallback demo data`,
      );

      return FALLBACK_SHORTAGE_LIST.filter((s) => s.status === "active");
    }

    const json: FdaShortagesResponse = await response.json();

    const fdaShortages = (json.results ?? [])
      .map(mapFdaRecord)
      .filter((s): s is DrugShortage => s !== undefined)
      .filter((s) => s.status === "active");

    console.warn(
      `[ShortageService] ${fdaShortages.length} active shortages from FDA:`,
      fdaShortages.slice(0, 20).map((s) => s.genericName),
    );

    return fdaShortages;
  }
}
