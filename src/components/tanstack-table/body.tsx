import { cn } from "@/lib/utils";
import { TableBody, TableRow, TableCell } from "../ui/table";
import type { Table, RowData } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";

type BodyProps<TData extends RowData> = {
  table: Table<TData>;
  className?: string;
  rowClassName?: string;
};

function TanstackTableBody<TData extends RowData>({
  table,
  className,
  rowClassName,
}: BodyProps<TData>) {
  return (
    <TableBody>
      {table.getRowModel().rows.map((row) => (
        <TableRow key={row.id} className={cn("", className)}>
          {row.getVisibleCells().map((cell) => (
            <TableCell
              key={cell.id}
              className={cn(
                "whitespace-normal break-words border rounded-xl",
                rowClassName
              )}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}

export default TanstackTableBody;
