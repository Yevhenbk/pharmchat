import { describe, it, expect } from "vitest";

import {
  DEMO_ACTION_ITEMS,
  getActionItemById,
  SEVERITY_TO_MODE,
} from "./action-items-data";

describe("action-items-data", () => {
  describe("getActionItemById", () => {
    it("returns the matching action item", () => {
      const item = getActionItemById("po-1099");

      expect(item).toBeDefined();
      expect(item?.title).toBe("PO 1099: Order Cancelled");
    });

    it("returns undefined for unknown id", () => {
      expect(getActionItemById("nonexistent")).toBeUndefined();
    });
  });

  describe("SEVERITY_TO_MODE", () => {
    it("maps critical to critical", () => {
      expect(SEVERITY_TO_MODE.critical).toBe("critical");
    });

    it("maps warning to warning", () => {
      expect(SEVERITY_TO_MODE.warning).toBe("warning");
    });

    it("maps fyi to fyi", () => {
      expect(SEVERITY_TO_MODE.fyi).toBe("fyi");
    });
  });

  describe("DEMO_ACTION_ITEMS", () => {
    it("has unique ids", () => {
      const ids = DEMO_ACTION_ITEMS.map((item) => item.id);
      const uniqueIds = new Set(ids);

      expect(uniqueIds.size).toBe(ids.length);
    });

    it("each item has required fields", () => {
      for (const item of DEMO_ACTION_ITEMS) {
        expect(item.id).toBeTruthy();
        expect(item.type).toBeTruthy();
        expect(item.severity).toBeTruthy();
        expect(item.title).toBeTruthy();
      }
    });
  });
});
