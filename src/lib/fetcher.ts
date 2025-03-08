type AnyObject = Record<string, unknown>;
type Params = Record<string, string | undefined | null | number | boolean>;
type RequestBody = AnyObject | unknown[] | FormData;
type ResponseBody = AnyObject | unknown[] | ArrayBuffer;
type Configs = Omit<RequestInit, 'body' | 'signal' | 'method'>;

export type MethodConfigs = Configs & {
  timeout?: number;
  controller?: AbortController;
  params?: Params;
};

type FetchConfigs = MethodConfigs & {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
};

type ResponseType<T extends ResponseBody> = {
  status: number;
  ok: true;
  data: T;
};

export interface FetcherError<T extends ResponseBody = AnyObject> extends Error {
  status: number;
  ok: false;
  data?: T;
}

type OptionExtractor = (options: Configs) => Configs;

class Fetcher {
  private configs: Configs = {};

  private configsExtractor: OptionExtractor = (configs) => configs;

  constructor(
    private baseUrl = '',
    private timeout = 0,
  ) {}

  public extractConfigs(optionExtractor: OptionExtractor) {
    this.configsExtractor = optionExtractor;
  }

  public setDefaultConfigs(configs: Configs) {
    this.configs = { ...this.configs, ...configs };
  }

  private async fetch<TResData extends ResponseBody, TErrorData extends ResponseBody>(
    url: string,
    options: FetchConfigs,
    body?: RequestBody,
  ) {
    if (typeof fetch === 'undefined') {
      throw new Error(
        'The Fetch Web API is not supported in this environment, please use in a browser environment or Node.js version >= 18',
      );
    }

    const timeout = options.timeout ?? this.timeout;
    const params = options.params;
    let controller = options.controller;

    delete options.controller;

    if (params) {
      Object.keys(params).forEach((key) => {
        if (params[key] === undefined || params[key] === null || params[key] === '') {
          delete params[key];
        } else if (typeof params[key] === 'number' || typeof params[key] === 'boolean') {
          params[key] = String(params[key]);
        }
      });

      url +=
        (url.includes('?') ? '&' : '?') +
        `${new URLSearchParams(params as Record<string, string>).toString()}`;
      delete options.params;
    }

    let timeOuted: boolean | undefined;
    let timeoutId: NodeJS.Timeout | undefined;
    if (timeout) {
      delete options.timeout;
      if (!controller) controller = new AbortController();

      timeoutId = setTimeout(() => {
        timeOuted = true;
        controller?.abort('Request timed out');
      }, timeout);
    }

    const finalOptions: RequestInit = {
      ...this.configsExtractor(this.configs),
      ...options,
    };

    if (body instanceof FormData) {
      finalOptions.body = body;
    } else if (body && typeof body === 'object') {
      if (!finalOptions.headers || !('Content-Type' in finalOptions.headers)) {
        finalOptions.headers = {
          ...(finalOptions.headers || {}),
          'Content-Type': 'application/json',
        };
      }
      finalOptions.body = JSON.stringify(body);
    }

    if (controller) finalOptions.signal = controller.signal;

    const response = await fetch(
      url.startsWith('http') ? url : `${this.baseUrl}${url}`,
      finalOptions,
    ).catch((err: Error) => {
      // TODO: Handle error
      const error = new Error(err.message ?? 'Failed to fetch') as FetcherError<TErrorData>;
      error.status = 500;
      error.ok = false;
      error.name = err.name ?? 'FetcherError';
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
        if (err.name === 'AbortError' && timeOuted) {
          error.name = 'TimeoutError';
          error.message = 'Request timed out';
          error.status = 408;
        }
      }
      throw error;
    });

    if (timeoutId !== undefined) clearTimeout(timeoutId);

    const responseObj = {
      status: response.status,
      ok: response.ok,
    } as ResponseType<TResData>;

    const contentType = response.headers.get('content-type');

    let data: TResData | TErrorData;
    if (contentType?.includes('application/json')) {
      data = await (response.json() as Promise<TResData | TErrorData>);
    } else if (
      contentType?.includes('application/octet-stream') ||
      contentType?.includes('application/pdf')
    ) {
      data = await (response.arrayBuffer() as Promise<TResData>);
    } else {
      throw new Error('Unsupported content type: ' + contentType);
    }

    if (!response.ok) {
      const error = new Error(
        `Request failed with status code ${response.status} -- ${response.statusText}`,
      ) as FetcherError<TErrorData>;
      error.name = response.statusText;
      error.data = data as TErrorData;
      error.status = response.status;
      error.ok = false;
      throw error;
    }
    responseObj.data = data as TResData;

    return responseObj;
  }

  public get<T extends ResponseBody = AnyObject, E extends ResponseBody = AnyObject>(
    url: string,
    options: MethodConfigs = {},
  ) {
    return this.fetch<T, E>(url, { ...options, method: 'GET' });
  }

  public post<T extends ResponseBody = AnyObject, E extends ResponseBody = AnyObject>(
    url: string,
    body: RequestBody,
    options: MethodConfigs = {},
  ) {
    return this.fetch<T, E>(url, { ...options, method: 'POST' }, body);
  }

  public patch<T extends ResponseBody = AnyObject, E extends ResponseBody = AnyObject>(
    url: string,
    body: RequestBody,
    options: MethodConfigs = {},
  ) {
    return this.fetch<T, E>(url, { ...options, method: 'PATCH' }, body);
  }

  public put<T extends ResponseBody = AnyObject, E extends ResponseBody = AnyObject>(
    url: string,
    body: RequestBody,
    options: MethodConfigs = {},
  ) {
    return this.fetch<T, E>(url, { ...options, method: 'PUT' }, body);
  }

  public delete<T extends ResponseBody = AnyObject, E extends ResponseBody = AnyObject>(
    url: string,
    options: MethodConfigs = {},
  ) {
    return this.fetch<T, E>(url, { ...options, method: 'DELETE' });
  }

  static dataExtractor = <T extends ResponseBody>(res: ResponseType<T>) => res.data;
}

export default Fetcher;
