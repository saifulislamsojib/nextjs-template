import "server-only";

import getHttpService from "@/lib/getHttpService";
import { cookies } from "next/headers";

const serverHttpService = getHttpService();

serverHttpService.instance.interceptors.request.use((config) => {
  config.headers.Cookie = cookies().toString();
  return config;
});

export const serverRequests = serverHttpService.requests;
