import type { FetcherError, JsonAble } from 'fetcher-lite';
import type { ComponentProps, ReactNode } from 'react';

export type Params = Record<string, string | undefined>;

export type WithChildrenProps = Readonly<{
  children: ReactNode;
}>;

export type AnyObject = Record<string, unknown>;

export type NextError = { error: Error; reset: () => void };

export type ApiResponse<T extends JsonAble = JsonAble> = {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    total: number;
  };
};

export type ApiErrorResponse = {
  success: boolean;
  type: string;
  message: string;
};

export type FetchError = FetcherError<ApiErrorResponse>;

export type SVGProps = ComponentProps<'svg'>;
