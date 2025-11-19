import "../tailwind.css";
import type {
  RowAction,
  Schema,
  TableModel,
} from "../widgets/InfiniteTable/types";
import {
  ItemSize,
  ColumnType,
  PinDirection,
} from "../widgets/InfiniteTable/constants";
import type { AppsmithTableStyles } from "@/widgets/InfiniteTable/types/style.types";

export const postsSchema: Schema = {
  id: {
    type: ColumnType.TEXT,
    title: "ID",
    sort: true,
    filter: true,
  },
  name: {
    type: ColumnType.TEXT,
    title: "Name",
    sort: true,
    filter: true,
    size: ItemSize.md,
  },
  email: {
    type: ColumnType.NUMBER,
    title: "Email",
    sort: true,
    filter: true,
    size: ItemSize.md,
  },
  phone: {
    type: ColumnType.TEXT,
    title: "Phone",
    sort: true,
    filter: true,
    size: ItemSize.lg,
  },
  agent: {
    type: ColumnType.TEXT,
    title: "Agent",
    sort: true,
    filter: true,
    size: ItemSize.lg,
  },
};

export const postsRowActions: RowAction[] = [
  { title: "Korish", onClick: "onClick", icon: "Activity" },
  { title: "Qoshish", onClick: "onKomol", icon: "AlarmClockPlus" },
  { title: "Tolov", onClick: "onClick" },
];

export const tableStyles: AppsmithTableStyles = {
  head: {
    body: "bg-[var(--primary)] text-[var(--primary-foreground)]",
    row: "hover:bg-[var(--primary-foreground)] hover:text-[var(--primary)] transition-colors duration-200",
    cell: "border-b border-[var(--border)]",
    icon: "text-[var(--secondary-foreground)] ",
  },

  body: {
    body: "bg-[var(--card)] text-[var(--card-foreground)]",
    row: "odd:bg-[var(--accent)] even:bg-[var(--card)] hover:bg-[var(--muted)] transition-colors duration-200",
    cell: "border-b border-[var(--border)]",
  },

  card: {
    container: "bg-[var(--card)] shadow-md rounded-lg px-1",
    header: "text-lg font-bold text-[var(--foreground)]",
    content: "text-[var(--foreground)]",
  },

  table: "",

  variables: {
    "--primary": "hsl(220 70% 50%)",
    "--primary-foreground": "hsl(0 0% 100%)",
    "--card": "hsl(0 0% 100%)",
    "--card-foreground": "hsl(0 0% 10%)",
    "--popover": "hsl(220 70% 50%)",
    "--border": "hsl(0 0% 90%)",
    "--accent": "hsl(43 74% 66%)",
    "--muted": "hsl(0 0% 96%)",
    "--foreground": "hsl(0 0% 10%)",
  },
};

export const StyledTableProps: TableModel = {
  fetcher: {
    url: "https://ssl.smarts.uz/user",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTc1ODM0NTM4N30.Elx91NM_XS8YulaA6S0PzRJR2nA3aZXp5D6-YrEvtZw",
    },
  },
  schema: postsSchema,
  rowActions: postsRowActions,
  actionColumn: { enable: true, pin: PinDirection.right, size: ItemSize.sm },
  indexRow: { enable: true, size: ItemSize.sm },
  styles: tableStyles,
};
