import "./tailwind.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./tailwind.css";
import TestTable from "./components/TestTable";
import React from "react";
import { postsTableSchema } from "./lib/mock";

export const mockModel = {
  fetcher: {
    url: "https://jsonplaceholder.typicode.com/posts",
    method: "GET",
  },
  schema: postsTableSchema,
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TestTable model={mockModel} />
  </StrictMode>
);
