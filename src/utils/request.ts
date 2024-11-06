import Fetcher from "@/lib/fetcher";

const request = new Fetcher(process.env.NEXT_PUBLIC_API_BASE_URL);

request.setDefaultConfigs({ credentials: "include" });

request.extractConfigs((configs) => ({
  ...configs,
  headers: {
    ...configs.headers,
    // Authorization: `Bearer ${localStorage.getItem("jwt-token")}`,
  },
}));

export default request;
