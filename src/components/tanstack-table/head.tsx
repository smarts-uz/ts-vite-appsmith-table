import { flexRender } from "@tanstack/react-table";
import type { Table } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { TableHeader, TableHead, TableRow } from "@/components/ui/table";
import type { TableHeadStyles } from "@/widgets/ClientTable/types/index";

interface HeadProps<TData> {
  table: Table<TData>;
  styles?: TableHeadStyles;
}

const TanstackTableHead = <TData,>({ table, styles }: HeadProps<TData>) => {
  return (
    <TableHeader
      className={cn(
        "top-0 sticky bg-card outline-border border-b outline",
        styles?.body
      )}
    >
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id} className={styles?.row}>
          {headerGroup.headers.map((header) => (
            <TableHead
              key={header.id}
              colSpan={header.colSpan}
              className={cn(
                "whitespace-normal break-words text-center border p-1 md:text-start min-w-8 md:px-2",
                header.column.getCanSort() && "cursor-pointer",
                styles?.cell
              )}
              onClick={header.column.getToggleSortingHandler()}
            >
              {flexRender(header.column.columnDef.header, header.getContext())}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  );
};

export default TanstackTableHead;
