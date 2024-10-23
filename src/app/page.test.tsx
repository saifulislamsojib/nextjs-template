import { render } from "@/lib/test.utils";
import { screen } from "@testing-library/react";
import HomePage from "./page";

describe("Page", () => {
  it("renders a heading", () => {
    render(<HomePage />);

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});
