import "server-only";

import { readdir, readFile } from "fs/promises";
import { join } from "path";

import type {
  SchemaProperty,
  SchemaModel,
  SchemaDomain,
  SchemaEnumItem,
  SchemaData,
} from "@models/schema";

// ── Configuration ─────────────────────────────────────

const MODELS_DIR = join(process.cwd(), "app/models");

const FILE_DOMAIN_MAP: Record<string, string> = {
  "procurement.ts": "Procurement",
  "action-item.ts": "Action Items",
  "action-content.ts": "Action Content",
  "chat.ts": "Chat",
  "activity-feed.ts": "Activity Feed",
  "upcoming-risk.ts": "Upcoming Risk",
};

const EXCLUDED_FILES = new Set([
  "repository.ts",
  "schema.ts",
  "modal.ts",
]);

// ── Parsing helpers ───────────────────────────────────

function computeDepth({
  character,
  currentDepth,
}: {
  character: string;
  currentDepth: number;
}): number {
  if (character === "{") {
    return currentDepth + 1;
  }

  if (character === "}") {
    return currentDepth - 1;
  }

  return currentDepth;
}

function findClosingBrace({
  source,
  fromIndex,
}: {
  source: string;
  fromIndex: number;
}): number {
  const characters = [...source.slice(fromIndex)];

  const result = characters.reduce(
    (
      state: { depth: number; foundAt: number },
      character,
      index,
    ) => {
      if (state.foundAt >= 0) {
        return state;
      }

      const depth = computeDepth({
        character,
        currentDepth: state.depth,
      });

      if (depth === 0) {
        return { depth, foundAt: index };
      }

      return { depth, foundAt: -1 };
    },
    { depth: 1, foundAt: -1 },
  );

  return fromIndex + result.foundAt;
}

function extractTopLevelProperties(
  body: string,
): readonly SchemaProperty[] {
  const lines = body.split("\n");

  const result = lines.reduce<{
    properties: readonly SchemaProperty[];
    depth: number;
  }>(
    (state, line) => {
      const trimmed = line.trim();
      const openBraces = (trimmed.match(/\{/g) ?? [])
        .length;
      const closeBraces = (trimmed.match(/\}/g) ?? [])
        .length;
      const newDepth =
        state.depth + openBraces - closeBraces;

      if (state.depth !== 0) {
        return { ...state, depth: newDepth };
      }

      const propertyMatch = trimmed.match(
        /^(?:readonly\s+)?(\w+)(\?)?\s*:\s*(.+?);\s*$/,
      );

      if (propertyMatch) {
        return {
          properties: [
            ...state.properties,
            {
              name: propertyMatch[1],
              type: propertyMatch[3].trim(),
              optional: propertyMatch[2] === "?",
            },
          ],
          depth: newDepth,
        };
      }

      const nestedMatch = trimmed.match(
        /^(?:readonly\s+)?(\w+)(\?)?\s*:\s*\{/,
      );

      if (nestedMatch) {
        return {
          properties: [
            ...state.properties,
            {
              name: nestedMatch[1],
              type: "{ ... }",
              optional: nestedMatch[2] === "?",
            },
          ],
          depth: newDepth,
        };
      }

      return { ...state, depth: newDepth };
    },
    { properties: [], depth: 0 },
  );

  return result.properties;
}

function extractInterfaces(
  source: string,
): readonly SchemaModel[] {
  const matches = [
    ...source.matchAll(
      /export interface (\w+)\s*\{/g,
    ),
  ];

  return matches.map((match) => {
    const name = match[1];
    const bodyStart = match.index + match[0].length;

    const bodyEnd = findClosingBrace({
      source,
      fromIndex: bodyStart,
    });

    const body = source.slice(bodyStart, bodyEnd);
    const properties = extractTopLevelProperties(body);

    return { name, properties };
  });
}

function extractEnums(
  source: string,
): readonly SchemaEnumItem[] {
  const matches = [
    ...source.matchAll(
      /export const (\w+)\s*=\s*\[([^\]]*)\]\s*as const/g,
    ),
  ];

  return matches
    .map((match) => ({
      name: match[1],
      values: match[2]
        .split(",")
        .map((value) =>
          value.trim().replace(/['"]/g, ""),
        )
        .filter(Boolean)
        .join(" | "),
    }))
    .filter((item) => item.values.length > 0);
}

function addRelations({
  models,
  allModelNames,
}: {
  models: readonly SchemaModel[];
  allModelNames: ReadonlySet<string>;
}): readonly SchemaModel[] {
  return models.map((model) => ({
    ...model,
    properties: model.properties.map((property) => {
      const cleanType = property.type
        .replace(/readonly\s+/g, "")
        .trim();

      const arrayMatch = cleanType.match(/^(\w+)\[\]$/);

      if (arrayMatch && allModelNames.has(arrayMatch[1])) {
        return {
          ...property,
          relation: "has many",
          relationTarget: arrayMatch[1],
        };
      }

      if (allModelNames.has(cleanType)) {
        return {
          ...property,
          relation: "has one",
          relationTarget: cleanType,
        };
      }

      return property;
    }),
  }));
}

// ── Service ───────────────────────────────────────────

export default class SchemaService {
  static async parseModels(): Promise<SchemaData> {
    const files = await readdir(MODELS_DIR);

    const modelFiles = files.filter(
      (file) =>
        file.endsWith(".ts") &&
        !file.endsWith(".test.ts") &&
        !EXCLUDED_FILES.has(file),
    );

    const fileResults = await Promise.all(
      modelFiles.map(async (fileName) => {
        const content = await readFile(
          join(MODELS_DIR, fileName),
          "utf-8",
        );

        return {
          fileName,
          domain:
            FILE_DOMAIN_MAP[fileName] ??
            fileName.replace(".ts", ""),
          interfaces: extractInterfaces(content),
          enums: extractEnums(content),
        };
      }),
    );

    const allModels = fileResults.flatMap(
      (file) => file.interfaces,
    );

    const allModelNames = new Set(
      allModels.map((model) => model.name),
    );

    const domains: readonly SchemaDomain[] = fileResults
      .filter((file) => file.interfaces.length > 0)
      .map((file) => ({
        label: file.domain,
        models: addRelations({
          models: file.interfaces,
          allModelNames,
        }),
      }));

    const enums: readonly SchemaEnumItem[] =
      fileResults.flatMap((file) => file.enums);

    return { domains, enums };
  }
}
