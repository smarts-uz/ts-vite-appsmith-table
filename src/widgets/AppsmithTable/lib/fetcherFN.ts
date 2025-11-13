import { HTTP_METHODS } from "../constants";
import { getNestedValue } from "./getNestedValue";
import type { Fetcher } from "../types";

type FetcherOptions = Fetcher & {
  cb?: (data: any) => void;
};

export const fetcherFN = async <T = unknown>({
  url,
  headers,
  body,
  method = HTTP_METHODS.GET,
  accessor,
  cb,
}: FetcherOptions): Promise<T[]> => {
  const res = await fetch(url, { headers, method, body });

  if (!res.ok)
    throw new Error(`Network error: ${res.status} ${res.statusText}`);

  const json = await res.json();
  const data = getNestedValue<T>(json, accessor, []);

  if (cb) {
    cb(data);
  }

  return data;
};
