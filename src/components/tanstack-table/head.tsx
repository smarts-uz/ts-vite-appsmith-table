import { flexRender } from "@tanstack/react-table";
import type { Table } from "@tanstack/react-table";
import { ChevronsUpDown, ChevronsDown, ChevronsUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { TableHeader, TableHead, TableRow } from "@/components/ui/table";

interface HeadProps<TData> {
  table: Table<TData>;
  className?: string;
}

const TanstackTableHead = <TData,>({ table, className }: HeadProps<TData>) => {
  return (
    <TableHeader>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHead
              key={header.id}
              colSpan={header.colSpan}
              className={cn(
                "text-center select-none px-0.5 py-1 text-xs xs:text-sm md:p-1 md:text-start min-w-6",
                className,
                header.column.getCanSort() ? "cursor-pointer" : ""
              )}
              onClick={header.column.getToggleSortingHandler()}
            >
              {flexRender(header.column.columnDef.header, header.getContext())}

              {{
                asc: header.column.getCanSort() && (
                  <ChevronsDown className="text-foreground dark:text-primary hidden size-4 sm:inline-block" />
                ),
                desc: header.column.getCanSort() && (
                  <ChevronsUp className="text-foreground dark:text-primary hidden size-4 sm:inline-block" />
                ),
              }[header.column.getIsSorted() as "asc" | "desc"] ??
                (header.column.getCanSort() && (
                  <ChevronsUpDown className="hidden size-4 sm:inline-block" />
                ))}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  );
};
export default TanstackTableHead;
