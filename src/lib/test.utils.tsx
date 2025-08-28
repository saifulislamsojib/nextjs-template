import { cleanup, render, type RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Providers from '../providers';

afterEach(() => {
  cleanup();
});

type Options = Omit<RenderOptions, 'wrapper'>;

function customRender(ui: React.ReactNode, options: Options = {}) {
  return render(ui, {
    wrapper: ({ children }) => <Providers>{children}</Providers>,
    ...options,
  });
}

const setup = (ui: React.ReactNode, options?: Options) => {
  return {
    user: userEvent.setup(),
    ...customRender(ui, options),
  };
};

export { customRender as render, setup, userEvent };
