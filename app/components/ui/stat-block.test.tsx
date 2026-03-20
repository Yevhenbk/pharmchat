import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatBlock } from "./stat-block";

describe("StatBlock", () => {
  it("renders label and string value", () => {
    render(<StatBlock label="Total Orders" value="142" />);
    expect(screen.getByText("Total Orders")).toBeInTheDocument();
    expect(screen.getByText("142")).toBeInTheDocument();
  });

  it("renders numeric value", () => {
    render(<StatBlock label="Revenue" value={24350} />);
    expect(screen.getByText("24350")).toBeInTheDocument();
  });

  it("renders children", () => {
    render(
      <StatBlock label="Fill Rate" value="94.2%">
        <span>trend info</span>
      </StatBlock>,
    );
    expect(screen.getByText("trend info")).toBeInTheDocument();
  });
});
