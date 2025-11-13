import { ColumnType, ItemSize, PinDirection, HTTP_METHODS } from "../constants";

export type ColumnSchema = {
  type: ColumnType;
  title?: string;
  sort?: boolean;
  filter?: boolean;
  size?: ItemSize;
};

export type RowAction = {
  title: string;
  onClick: string;
};

type ActionColumn = {
  enable: boolean;
  pin: PinDirection | null;
  size: ItemSize;
};

type IndexRow = {
  enable: boolean;
  size: ItemSize;
  pin: PinDirection | null;
};

export type ColumnSchemaItem = {
  type: ColumnType;
  options?: { value: string; title: string }[];
  sort?: boolean;
  filter?: boolean;
  pin?: PinDirection | null;
  size?: ItemSize;
  textAlign?: "left" | "center" | "right";
  title?: string;
  dateFormat?: string;
  minOptions?: number[];
  maxOptions?: number[];
};

export type Fetcher = {
  url: string;
  method: HTTP_METHODS;
  headers?: Record<string, string>;
  body?: BodyInit | null;
  accessor?: string;
};

export type ColumnParams<TData> = {
  data: TData[];
  schema: Record<string, ColumnSchemaItem>;
  indexRow?: IndexRow;
  rowActions?: RowAction[];
  actionColumn?: ActionColumn;
};

export type TableModel = {
  fetcher: Fetcher;
  schema: Record<string, ColumnSchemaItem>;
  indexRow?: IndexRow;
  rowActions?: RowAction[];
  rowSelectionAction?: string;
  actionColumn?: ActionColumn;
  translations?: Record<string, string>;
};
