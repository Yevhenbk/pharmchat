import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ActionItemIcon } from "./action-item-icon";
import { ACTION_ITEM_TYPES } from "@models/action-item";

describe("ActionItemIcon", () => {
  it("renders an SVG element for order-cancelled type", () => {
    const { container } = render(<ActionItemIcon type="order-cancelled" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders an SVG element for price-increase type", () => {
    const { container } = render(<ActionItemIcon type="price-increase" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("renders an SVG element for demand-surge type", () => {
    const { container } = render(<ActionItemIcon type="demand-surge" />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it.each(ACTION_ITEM_TYPES)("renders an SVG for type %s", (type) => {
    const { container } = render(<ActionItemIcon type={type} />);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
