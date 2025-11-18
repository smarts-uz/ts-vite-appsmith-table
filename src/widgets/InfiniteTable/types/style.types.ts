import z from "zod";

const TableBody = z.object({
  body: z.string().optional(),
  row: z.string().optional(),
  cell: z.string().optional(),
});

const TableHead = TableBody.extend({ icon: z.string().optional() });

const Card = z.object({
  container: z.string().optional(),
  header: z.string().optional(),
  content: z.string().optional(),
});

export const AppsmithTableStyles = z
  .object({
    head: TableHead.optional(),
    body: TableBody.optional(),
    card: Card.optional(),
    table: z.string().optional(),
    variables: z.record(z.string(), z.string()).optional(),
  })
  .optional();

export type TableHeadStyles = z.infer<typeof TableHead>;
export type TableBodyStyles = z.infer<typeof TableBody>;
export type AppsmithTableStyles = z.infer<typeof AppsmithTableStyles>;
