import { ReactNode } from "react";

export type LayoutProps = Readonly<{
  children: ReactNode;
}>;

export type AnyObject = Record<string, unknown>;

export type PageProps<P extends AnyObject = {}, S extends AnyObject = {}> = {
  params: P;
  searchParams: S;
};

export type NextError = { error: Error; reset: () => void };

export type ApiResponse<T extends object> = {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    total: number;
  };
};

export type ApiErrorResponse = {
  response: {
    success: boolean;
    type: string;
    message: string;
    errorDetails: Error | null;
    stack: Error | null;
  };
};
