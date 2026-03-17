import { describe, it, expect } from "vitest";

import { FormatService } from "./format";

describe("FormatService", () => {
  describe("currency", () => {
    it("formats a whole number with two decimals", () => {
      expect(FormatService.currency(1000)).toBe("$1,000.00");
    });

    it("formats a decimal value", () => {
      expect(FormatService.currency(42.5)).toBe("$42.50");
    });

    it("formats zero", () => {
      expect(FormatService.currency(0)).toBe("$0.00");
    });
  });

  describe("currencyWhole", () => {
    it("formats without decimals", () => {
      expect(FormatService.currencyWhole(1000)).toBe("$1,000");
    });

    it("rounds decimal values", () => {
      expect(FormatService.currencyWhole(42.7)).toBe("$43");
    });
  });

  describe("compactCurrency", () => {
    it("formats millions with M suffix", () => {
      expect(FormatService.compactCurrency(1_500_000)).toBe("$1.5M");
    });

    it("formats thousands with K suffix", () => {
      expect(FormatService.compactCurrency(4_500)).toBe("$4.5K");
    });

    it("falls back to currency for small values", () => {
      expect(FormatService.compactCurrency(42)).toBe("$42.00");
    });

    it("formats exactly 1M", () => {
      expect(FormatService.compactCurrency(1_000_000)).toBe("$1.0M");
    });

    it("formats exactly 1K", () => {
      expect(FormatService.compactCurrency(1_000)).toBe("$1.0K");
    });
  });
});
