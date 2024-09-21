import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const getHttpService = () => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 1500000,
  });

  const responseBody = <T extends object>(response: AxiosResponse<T>) => response.data;

  const requests = {
    get: <T extends object>(url: string, config?: AxiosRequestConfig<T>): Promise<T> =>
      instance.get(url, config).then(responseBody),
    post: <T extends object>(
      url: string,
      body: object,
      config?: AxiosRequestConfig<T>,
    ): Promise<T> => instance.post(url, body, config).then(responseBody),
    patch: <T extends object>(
      url: string,
      body: object,
      config?: AxiosRequestConfig<T>,
    ): Promise<T> => instance.patch(url, body, config).then(responseBody),
    delete: (url: string, config?: AxiosRequestConfig) =>
      instance.delete(url, config).then(responseBody),
  } as const;

  return { instance, requests };
};

export default getHttpService;
