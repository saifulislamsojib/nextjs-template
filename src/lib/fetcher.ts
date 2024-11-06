type Configs = Omit<RequestInit, "body" | "signal" | "method">;

type MethodConfigs = Configs & {
  timeout?: number;
  controller?: AbortController;
};

type FetchConfigs = MethodConfigs & {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
};

type MustHeaderConfigs = Configs & {
  headers: HeadersInit;
};

type AnyObject = Record<string, unknown>;

type RequestBody = AnyObject | unknown[] | FormData;

type ResponseBody = AnyObject | unknown[] | ArrayBuffer;

type ResponseType<T extends ResponseBody> = {
  status: number;
  ok: boolean;
  data: T;
};

class Fetcher {
  private configs: MustHeaderConfigs = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  private configsExtractor = (configs: MustHeaderConfigs) => configs;

  constructor(
    private baseUrl = "",
    private timeout = 10000,
  ) {}

  public extractConfigs(optionExtractor: (options: MustHeaderConfigs) => MustHeaderConfigs) {
    this.configsExtractor = optionExtractor;
  }

  public setDefaultConfigs(Configs: Configs) {
    this.configs = {
      ...this.configs,
      ...Configs,
    };
  }

  private async fetch<TResData extends ResponseBody>(
    url: string,
    options: FetchConfigs,
    body?: RequestBody,
  ) {
    const timeout = options.timeout ?? this.timeout;
    const controller = options.controller || new AbortController();
    delete options.timeout;
    delete options.controller;

    const finalOptions: RequestInit = { ...this.configsExtractor(this.configs), ...options };

    if (body instanceof FormData) {
      finalOptions.headers = {
        ...finalOptions.headers,
        "Content-Type": "multipart/form-data",
      };
      finalOptions.body = body;
    } else if (typeof body === "object") {
      if (!("Content-Type" in finalOptions.headers!)) {
        finalOptions.headers = {
          "Content-Type": "application/json",
          ...finalOptions.headers,
        };
      }
      finalOptions.body = JSON.stringify(body);
    }

    finalOptions.signal = controller.signal;

    let timeOuted = false;

    const timeoutId = setTimeout(() => {
      timeOuted = true;
      controller.abort();
    }, timeout);

    const response = await fetch(
      url.startsWith("http") ? url : `${this.baseUrl}${url}`,
      finalOptions,
    ).catch((err: Error) => {
      clearTimeout(timeoutId);
      if (err.name === "AbortError" && timeOuted) {
        throw new Error("Request timeout error");
      }
      throw err;
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const responseObj = {
      status: response.status,
      ok: response.ok,
    } as ResponseType<TResData>;

    const contentType = response.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      responseObj.data = await (response.json() as Promise<TResData>);
    } else if (
      contentType?.includes("application/octet-stream") ||
      contentType?.includes("application/pdf")
    ) {
      responseObj.data = await (response.arrayBuffer() as Promise<TResData>);
    } else {
      throw new Error("Unsupported content type: " + contentType);
    }

    return responseObj;
  }

  public get<T extends ResponseBody = AnyObject>(url: string, options: MethodConfigs = {}) {
    return this.fetch<T>(url, { ...options, method: "GET" });
  }

  public post<T extends ResponseBody = AnyObject>(
    url: string,
    body: RequestBody,
    options: MethodConfigs = {},
  ) {
    return this.fetch<T>(url, { ...options, method: "POST" }, body);
  }

  public patch<T extends ResponseBody = AnyObject>(
    url: string,
    body: RequestBody,
    options: MethodConfigs = {},
  ) {
    return this.fetch<T>(url, { ...options, method: "PATCH" }, body);
  }

  public put<T extends ResponseBody = AnyObject>(
    url: string,
    body: RequestBody,
    options: MethodConfigs = {},
  ) {
    return this.fetch<T>(url, { ...options, method: "PUT" }, body);
  }

  public delete<T extends ResponseBody = AnyObject>(url: string, options: MethodConfigs = {}) {
    return this.fetch<T>(url, { ...options, method: "DELETE" });
  }
}

export default Fetcher;
