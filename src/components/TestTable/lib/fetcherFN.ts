import { getNestedValue } from "./getNestedValue";

type FetcherOptions = {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  body?: BodyInit | null;
  accessor?: string; // string path like "data.items"
};

export const fetcherFN = async <T = unknown>({
  url,
  headers,
  body,
  method = "GET",
  accessor,
}: FetcherOptions): Promise<T[]> => {
  const res = await fetch(url, { headers, method, body });
  console.log("json1", res);

  if (!res.ok)
    throw new Error(`Network error: ${res.status} ${res.statusText}`);

  const json = await res.json();
  console.log("json", json);
  return getNestedValue<T>(json, accessor, []);
};
