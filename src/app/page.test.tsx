import { render } from "@/lib/test.utils";
import HomePage from "./page";

describe("Page", () => {
  it("renders a heading", () => {
    const { getByRole } = render(<HomePage />);

    const heading = getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
  });
});
