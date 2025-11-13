import { postsTableSchema } from "./types/mock";

export const mockModel = {
  fetcher: {
    url: "https://jsonplaceholder.typicode.com/posts",
    method: "GET",
    headers: {},
    body: {},
    accessor: ""
  },
  schema: postsTableSchema,
};
