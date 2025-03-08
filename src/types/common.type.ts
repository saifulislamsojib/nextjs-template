import type { FetcherError } from '@/lib/fetcher';
import type { ComponentProps, ReactNode } from 'react';

export type Params = Record<string, string | undefined>;

type ParamsPromise = Promise<Params>;

export type PageProps = Readonly<{
  params: ParamsPromise;
  searchParams: ParamsPromise;
}>;

export type WithChildrenProps = Readonly<{
  children: ReactNode;
}>;

export type LayoutProps = Readonly<{
  params: ParamsPromise;
  children: ReactNode;
}>;

export type AnyObject = Record<string, unknown>;

export type NextError = { error: Error; reset: () => void };

export type ApiResponse<T extends AnyObject | unknown[] = AnyObject> = {
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
