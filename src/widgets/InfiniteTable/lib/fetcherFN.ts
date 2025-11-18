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
  paginationKeys,
  perPage = 20,
  pageParam = 0,
}: FetcherOptions): Promise<T[]> => {
  const offsetKey = paginationKeys?.offset ?? "offset";
  const limitKey = paginationKeys?.limit ?? "limit";

  let queryUrl = url;

  if (method === HTTP_METHODS.GET) {
    const urlObj = new URL(url);
    urlObj.searchParams.set(offsetKey, String(pageParam));
    urlObj.searchParams.set(limitKey, String(perPage));
    queryUrl = urlObj.toString();
  }

  const res = await fetch(queryUrl, { method, headers, body });
  if (!res.ok)
    throw new Error(`Network error: ${res.status} ${res.statusText}`);

  const json = await res.json();
  const data = getNestedValue<T>(json, accessor, []);

  if (cb) cb(data);

  return data;
};
