import "./tailwind.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./tailwind.css";
import TestTable from "./components/TestTable";
import React from "react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TestTable />;
  </StrictMode>
);
