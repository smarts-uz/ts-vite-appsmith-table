import { ColumnType, ItemSize, PinDirection, HTTP_METHODS } from "../constants";
import z from "zod";

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
  title?: string;
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

const ColumnSchemaItemSchema = z.object({
  type: z.enum(ColumnType),
  options: z
    .array(z.object({ value: z.string(), title: z.string() }))
    .optional(),
  sort: z.boolean().optional(),
  filter: z.boolean().optional(),
  pin: z.enum(PinDirection).nullable().optional(),
  size: z.enum(ItemSize).optional(),
  title: z.string().optional(),
  minOptions: z.array(z.number()).optional(),
  maxOptions: z.array(z.number()).optional(),
});

const FetcherSchema = z.object({
  url: z.url({ error: "URL is not provided" }),
  method: z.enum(HTTP_METHODS).optional().default(HTTP_METHODS.GET),
  headers: z.record(z.string(), z.string()).optional(),
  body: z.any().optional(),
  accessor: z.string().optional(),
});

export const TableModelSchema = z.object({
  fetcher: FetcherSchema,
  schema: z.record(z.string(), ColumnSchemaItemSchema),
  indexRow: z
    .object({
      enable: z.boolean(),
      size: z.enum(ItemSize),
      pin: z.enum(PinDirection).nullable(),
    })
    .optional(),
  rowActions: z
    .array(z.object({ title: z.string(), onClick: z.string() }))
    .optional(),
  rowSelectionAction: z.string().optional(),
  actionColumn: z
    .object({
      enable: z.boolean(),
      size: z.enum(ItemSize).default(ItemSize.md),
      pin: z.enum(PinDirection).nullable(),
    })
    .optional(),
  translations: z.record(z.string(), z.string()).optional(),
});

export type TableModel = z.infer<typeof TableModelSchema>;
