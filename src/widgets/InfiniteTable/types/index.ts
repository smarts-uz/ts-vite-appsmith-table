import { ColumnType, ItemSize, PinDirection, HTTP_METHODS } from "../constants";
import z from "zod";
import * as LucideIcons from "lucide-react";
import { AppsmithTableStyles } from "./style.types";

const ColumnItemSchema = z.object({
  type: z.enum(ColumnType),
  options: z
    .array(z.object({ value: z.string(), title: z.string() }))
    .optional(),
  sort: z.boolean().optional(),
  filter: z.boolean().optional(),
  size: z.enum(ItemSize).optional(),
  title: z
    .string({ error: "An incorrect schema title is provided" })
    .optional(),
  className: z.string().optional(),
});

const FetcherSchema = z.object({
  url: z.url({ error: "URL is not provided" }),
  method: z.enum(HTTP_METHODS).default(HTTP_METHODS.GET).optional(),
  headers: z.record(z.string(), z.string()).optional(),
  body: z.any().optional(),
  accessor: z.string().optional(),
  paginationKeys: z
    .object({
      offset: z.string().default("offset"),
      limit: z.string().default("limit"),
    })
    .optional(),
  perPage: z.number().default(20).optional(),
  pageParam: z.number().default(0).optional()
});

export const IndexRowSchema = z.object({
  enable: z.boolean(),
  size: z.enum(ItemSize).default(ItemSize.sm).optional(),
});

export const ActionColumnSchema = z.object({
  enable: z.boolean(),
  size: z.enum(ItemSize).default(ItemSize.md),
  pin: z.enum(PinDirection).default(PinDirection.left),
});

export const RowActionSchema = z.object({
  title: z.string(),
  onClick: z.string(),
  icon: z
    .enum(Object.keys(LucideIcons) as [LucideIconName, ...LucideIconName[]])
    .optional(),
});

export const TableSchema = z.record(z.string(), ColumnItemSchema, {
  error: "Schema not provided",
});

export const TriggerEventSchema = z
  .function({
    input: [z.string(), z.object({ row: z.any() })],
  })
  .optional();

export const UpdateModelSchema = z
  .function({
    input: [z.any()],
  })
  .optional();

export const TableModelSchema = z.object({
  fetcher: FetcherSchema,
  schema: TableSchema,
  indexRow: IndexRowSchema.optional(),
  rowActions: z.array(RowActionSchema).optional(),
  rowSelectionAction: z.string().optional(),
  actionColumn: ActionColumnSchema.optional(),
  translations: z.record(z.string(), z.string()).optional(),
  updateModel: UpdateModelSchema,
  triggerEvent: TriggerEventSchema,
  styles: AppsmithTableStyles,
});

export interface AppsmithColumnMeta {
  filterVariant: string | null;
  headerText: string;
  size: ItemSize;
}

export type ColumnItem = z.infer<typeof ColumnItemSchema>;
export type TableModel = z.infer<typeof TableModelSchema>;
export type IndexRow = z.infer<typeof IndexRowSchema>;
export type ActionColumn = z.infer<typeof ActionColumnSchema>;
export type RowAction = z.infer<typeof RowActionSchema>;
export type Fetcher = z.infer<typeof FetcherSchema>;
export type LucideIconName = keyof typeof LucideIcons;
export type Schema = z.infer<typeof TableSchema>;
export type TriggerEvent = z.infer<typeof TriggerEventSchema>;
