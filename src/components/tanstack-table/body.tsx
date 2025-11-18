import { cn } from "@/lib/utils";
import { TableBody, TableRow, TableCell } from "../ui/table";
import type { Table, RowData } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import type { TableBodyStyles } from "@/widgets/InfiniteTable/types/style.types";
import { ItemSize } from "@/widgets/InfiniteTable/constants";
import type { AppsmithColumnMeta } from "@/widgets/InfiniteTable/types";

type BodyProps<TData extends RowData> = {
  table: Table<TData>;
  styles?: TableBodyStyles;
};

export const sizeClasses: Record<ItemSize, string> = {
  xs: "p-0.5 lg:p-1 mx-auto text-center lg:text-center",
  sm: "text-xs font-light px-0.5 py-1 leading-4 lg:p-1 lg:text-sm",
  md: "text-sm p-1 leading-5 lg:p-2 lg:text-base",
  lg: "text-base font-bold p-2 leading-6 lg:px-4 lg:py-2 lg:text-lg",
};

function TanstackTableBody<TData extends RowData>({
  table,
  styles,
}: BodyProps<TData>) {
  return (
    <TableBody className={styles?.body}>
      {table.getRowModel().rows.map((row) => (
        <TableRow
          key={row.id}
          className={cn("even:bg-foreground/5", styles?.row)}
        >
          {row.getVisibleCells().map((cell) => {
            const size =
              (cell.column.columnDef.meta as AppsmithColumnMeta)?.size ??
              ItemSize.md;
            const sizeClass = sizeClasses[size];

            return (
              <TableCell
                key={cell.id}
                className={cn(
                  "whitespace-normal break-words border text-center lg:text-start ",
                  sizeClass,
                  styles?.cell
                )}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </TableBody>
  );
}

export default TanstackTableBody;
