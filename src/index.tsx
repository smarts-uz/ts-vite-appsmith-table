import "./tailwind.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./tailwind.css";
import AppsmithTable from "./widgets/AppsmithTable";
import { postsTableSchema } from "./widgets/AppsmithTable/lib/mock.schema";
import React from "react";

export const mockModel = {
  fetcher: {
    url: "https://jsonplaceholder.typicode.com/posts",
  },
  schema: postsTableSchema,
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppsmithTable model={mockModel} />
  </StrictMode>
);
