import { describe, expect, it } from "vitest";

import { cn } from "./tailwind";

describe("cn", () => {
  it("merges class names", () => {
    const result = cn("px-2", "py-1");

    expect(result).toBe("px-2 py-1");
  });

  it("deduplicates conflicting tailwind classes", () => {
    const result = cn("px-2", "px-4");

    expect(result).toBe("px-4");
  });

  it("handles conditional classes", () => {
    const result = cn("base", false && "hidden", "visible");

    expect(result).toBe("base visible");
  });
});
