import "../tailwind.css";
import type {
  RowAction,
  Schema,
  TableModel,
} from "../widgets/ClientTable/types";
import { ItemSize, PinDirection } from "../widgets/ClientTable/constants";
import type { AppsmithTableStyles } from "@/widgets/ClientTable/types/index";
import data from "./data-1.json";

export const postsSchema: Schema = {
  id: {
    title: "ID",
    sort: true,
  },
  name: {
    title: "Name",
    sort: true,
    size: ItemSize.md,
  },
  email: {
    title: "Email",
    sort: true,
    size: ItemSize.md,
  },
  phone: {
    title: "Phone",
    sort: true,
    size: ItemSize.lg,
  },
  agent: {
    title: "Agent",
    sort: true,
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

  container: "bg-[var(--card)] shadow-md rounded-lg px-1",

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
  data,
  limit: 15,
  schema: postsSchema,
  rowActions: postsRowActions,
  actionColumn: { enable: true, pin: PinDirection.right, size: ItemSize.sm },
  indexRow: { enable: true, size: ItemSize.sm },
  styles: tableStyles,
};
