import type { ColumnType } from "@/types/schema";

export type RowAction<TData> = {
  title: string;
  onClick: (rowData: TData) => void;
};

export enum ItemSize {
  "xs" = "xs",
  "sm" = "sm",
  "md" = "md",
  "lg" = "lg",
}

export type ColumnSchemaItem = {
  type: ColumnType;
  options?: { value: string; title: string }[];
  sort?: boolean;
  filter?: boolean;
  pin?: "left" | "right" | null;
  size?: ItemSize;
  textAlign?: "left" | "center" | "right";
  title?: string;
  dateFormat?: string;
  minOptions?: number[];
  maxOptions?: number[];
};

export type ColumnParams<TData> = {
  data: TData[];
  schema: Record<string, ColumnSchemaItem>;
  rowIndexColumn?: { enable?: boolean };
  rowIndexPin?: "left" | "right" | null;
  rowIndexSize?: ItemSize;
  enablePagination?: boolean;
  enableRowPinning?: boolean;
  rowActions?: RowAction<TData>[];
  actionSize?: ItemSize;
  actionPin?: "left" | "right" | null;
  t: (key: string) => string;
  openDropdownRowId?: string | null;
  setOpenDropdownRowId?: (id: string | null) => void;
  formatDateString?: (value: string | Date, format?: string) => string;
};
