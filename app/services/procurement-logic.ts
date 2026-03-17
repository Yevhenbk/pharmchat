import type {
  DisruptionReport,
  DisruptionSeverity,
  Medication,
} from "@models/action-content";
import type { DrugShortage } from "@models/shortage";

const KNOWN_MEDICATIONS = [
  "amoxicillin",
  "insulin",
  "azithromycin",
  "doxycycline",
  "lisinopril",
  "metoprolol",
  "clavulanate",
  "metformin",
  "omeprazole",
  "morphine",
  "methotrexate",
  "midazolam",
  "methylprednisolone",
  "lisdexamfetamine",
  "oseltamivir",
  "divalproex",
  "warfarin",
  "atorvastatin",
  "vancomycin",
  "fentanyl",
] as const;

const CRITICAL_DAYS_THRESHOLD = 7;
const WARNING_PRICE_HIKE_THRESHOLD = 0.1;

function extractMedicationName(emailBody: string): string | undefined {
  const lower = emailBody.toLowerCase();

  return KNOWN_MEDICATIONS.find((name) => lower.includes(name));
}

function extractQuantity(emailBody: string): number | undefined {
  const match = emailBody.match(
    /\b(\d+)\s*(?:units?|capsules?|tablets?|tabs?|ea)\b/i,
  );

  if (!match) {
    return undefined;
  }

  return parseInt(match[1], 10);
}

function extractPriceHikeRatio(emailBody: string): number | undefined {
  const hasPriceContext =
    /price|cost|increase|hike|higher|additional/i.test(emailBody);

  if (!hasPriceContext) {
    return undefined;
  }

  const match = emailBody.match(/\b(\d+(?:\.\d+)?)\s*%/);

  if (!match) {
    return undefined;
  }

  return parseFloat(match[1]) / 100;
}

function checkNationalShortage({
  medicationName,
  nationalShortages,
}: {
  medicationName: string | undefined;
  nationalShortages: readonly DrugShortage[];
}): boolean {
  if (!medicationName) {
    return false;
  }

  const lower = medicationName.toLowerCase();

  return nationalShortages.some(
    (shortage) =>
      shortage.status === "active" &&
      (lower.includes(shortage.genericName.toLowerCase()) ||
        shortage.genericName.toLowerCase().includes(lower)),
  );
}

function deriveSeverity({
  matched,
  priceHikeRatio,
  isNationalShortage,
}: {
  matched: Medication | undefined;
  priceHikeRatio: number | undefined;
  isNationalShortage: boolean;
}): DisruptionSeverity {
  if (isNationalShortage) {
    return "CRITICAL";
  }

  if (matched && matched.daysOnHand < CRITICAL_DAYS_THRESHOLD) {
    return "CRITICAL";
  }

  if (
    priceHikeRatio !== undefined &&
    priceHikeRatio > WARNING_PRICE_HIKE_THRESHOLD
  ) {
    return "WARNING";
  }

  return "INFO";
}

function deriveRecommendedAction({
  severity,
  isNationalShortage,
}: {
  severity: DisruptionSeverity;
  isNationalShortage: boolean;
}): string {
  if (isNationalShortage) {
    return "National shortage in effect — source approved alternative immediately";
  }

  if (severity === "CRITICAL") {
    return "Activate emergency sourcing immediately";
  }

  if (severity === "WARNING") {
    return "Accept Substitution";
  }

  return "Acknowledge and monitor supply chain status";
}

export class ProcurementLogic {
  static analyzeOrderDisruption({
    currentInventory,
    emailBody,
    nationalShortages = [],
  }: {
    currentInventory: readonly Medication[];
    emailBody: string;
    nationalShortages?: readonly DrugShortage[];
  }): DisruptionReport {
    const medicationName = extractMedicationName(emailBody);
    const priceHikeRatio = extractPriceHikeRatio(emailBody);

    const matched = medicationName
      ? currentInventory.find((med) =>
          med.name.toLowerCase().includes(medicationName),
        )
      : undefined;

    const isNationalShortage = checkNationalShortage({
      medicationName,
      nationalShortages,
    });

    const severity = deriveSeverity({
      matched,
      priceHikeRatio,
      isNationalShortage,
    });

    return {
      severity,
      recommendedAction: deriveRecommendedAction({
        severity,
        isNationalShortage,
      }),
      isNationalShortage,
      medicationName,
    };
  }

  static buildInventoryFromLineItems(
    emailBody: string,
  ): readonly Medication[] {
    const quantity = extractQuantity(emailBody);

    if (!quantity) {
      return [];
    }

    const name = extractMedicationName(emailBody);

    if (!name) {
      return [];
    }

    return [
      {
        name,
        daysOnHand: quantity / 80,
        unitPrice: 0,
      },
    ];
  }
}
