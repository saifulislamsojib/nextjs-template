import { cleanup, render, RenderOptions } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReactNode } from "react";
import Providers from "../providers";

afterEach(() => {
  cleanup();
});

type Options = Omit<RenderOptions, "wrapper">;

function customRender(ui: ReactNode, options: Options = {}) {
  return render(ui, {
    wrapper: ({ children }) => <Providers>{children}</Providers>,
    ...options,
  });
}

const setup = (ui: ReactNode, options?: Options) => {
  return {
    user: userEvent.setup(),
    ...customRender(ui, options),
  };
};

export * from "@testing-library/react";
export { customRender as render, setup, userEvent };
