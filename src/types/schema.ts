// Allowed column data types
export enum ColumnType {
  TEXT = "text",
  NUMBER = "number",
  ENUM = "enum",
  BOOL = "bool",
  ID = "id",
  DATE = "date",
  CURRENCY = "currency",
  PHONE = "phone",
}

// Optional size for some columns
export type ColumnSize = "sm" | "md" | "lg";

// Individual column schema
export interface ColumnSchema {
  type: ColumnType;
  title: string;
  sort?: boolean;
  filter?: boolean;
  size?: ColumnSize;
}

export type TableSchema = Record<string, ColumnSchema>;
