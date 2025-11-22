import { ItemSize, PER_PAGE, PinDirection } from "../constants";
import z from "zod";
import * as LucideIcons from "lucide-react";
import { type SortDirection } from "@tanstack/react-table";

const ColumnItemSchema = z.object({
  sort: z.boolean().optional(),
  size: z.enum(ItemSize).optional(),
  title: z
    .string({ error: "An incorrect schema title is provided" })
    .optional(),
  className: z.string().optional(),
});

export const IndexRowSchema = z.object({
  enable: z.boolean(),
  pin: z.enum(PinDirection).default(PinDirection.left).optional(),
  size: z.enum(ItemSize).default(ItemSize.sm).optional(),
});

export const ActionColumnSchema = z.object({
  enable: z.boolean(),
  size: z.enum(ItemSize).default(ItemSize.md),
  pin: z.enum(PinDirection).default(PinDirection.left),
});

export type LucideIconName = keyof typeof LucideIcons;

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

const TableBody = z.object({
  body: z.string().optional(),
  row: z.string().optional(),
  cell: z.string().optional(),
});

const TableHead = TableBody.extend({ icon: z.string().optional() });

export const AppsmithTableStyles = z
  .object({
    head: TableHead.optional(),
    body: TableBody.optional(),
    container: z.string().optional(),
    table: z.string().optional(),
    variables: z.record(z.string(), z.string()).optional(),
  })
  .optional();

export const TriggerEventSchema = z
  .function({
    input: [
      z.string(),
      z.object({
        row: z.any().optional(),
        sortCol: z.string().optional(),
        sortOption: z.custom<SortDirection>().optional(),
        page: z.number().optional(),
        limit: z.number().optional(),
      }),
    ],
  })
  .optional();

export const UpdateModelSchema = z
  .function({
    input: [z.any()],
  })
  .optional();

export const TableModelSchema = z.object({
  data: z.array(z.any()).default([]),
  limit: z.number().default(PER_PAGE).optional(),
  schema: TableSchema,
  indexRow: IndexRowSchema.optional(),
  rowActions: z.array(RowActionSchema).optional(),
  rowSelectionAction: z.string().optional(),
  actionColumn: ActionColumnSchema.optional(),
  translations: z.record(z.string(), z.string()).optional(),
  styles: AppsmithTableStyles,
  triggerEvent: TriggerEventSchema,
  updateModel: UpdateModelSchema,
});

export interface AppsmithColumnMeta {
  headerText: string;
  size: ItemSize;
}

export type ColumnItem = z.infer<typeof ColumnItemSchema>;
export type TableModel = z.infer<typeof TableModelSchema>;
export type IndexRow = z.infer<typeof IndexRowSchema>;
export type ActionColumn = z.infer<typeof ActionColumnSchema>;
export type RowAction = z.infer<typeof RowActionSchema>;
export type Schema = z.infer<typeof TableSchema>;
export type TableHeadStyles = z.infer<typeof TableHead>;
export type TableBodyStyles = z.infer<typeof TableBody>;
export type AppsmithTableStyles = z.infer<typeof AppsmithTableStyles>;
export type TriggerEvent = z.infer<typeof TriggerEventSchema>;
