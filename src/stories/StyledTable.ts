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
  userId: {
    type: ColumnType.NUMBER,
    title: "User ID",
    sort: true,
    filter: true,
    size: ItemSize.md,
  },
  id: {
    type: ColumnType.TEXT,
    title: "Post ID",
    sort: true,
    filter: true,
  },
  title: {
    type: ColumnType.TEXT,
    title: "Title",
    sort: true,
    filter: true,
    size: ItemSize.md,
  },
  body: {
    type: ColumnType.TEXT,
    title: "Body",
    sort: true,
    filter: true,
    size: ItemSize.lg,
  },
  views: {
    type: ColumnType.NUMBER,
    title: "Views",
    sort: true,
    filter: true,
    size: ItemSize.md,
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
  fetcher: { url: "https://dummyjson.com/posts", accessor: "posts" },
  schema: postsSchema,
  rowActions: postsRowActions,
  actionColumn: { enable: true, pin: PinDirection.right, size: ItemSize.sm },
  indexRow: { enable: true, size: ItemSize.sm },
  styles: tableStyles,
};
