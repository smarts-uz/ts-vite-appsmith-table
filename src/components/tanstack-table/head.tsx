import { flexRender } from "@tanstack/react-table";
import type { Table } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { TableHeader, TableHead, TableRow } from "@/components/ui/table";
import type { TableHeadStyles } from "@/widgets/AppsmithTable/types/style.types";

interface HeadProps<TData> {
  table: Table<TData>;
  styles?: TableHeadStyles;
}

const TanstackTableHead = <TData,>({ table, styles }: HeadProps<TData>) => {
  return (
    <TableHeader className={styles?.body}>
      {table.getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id} className={styles?.row}>
          {headerGroup.headers.map((header) => (
            <TableHead
              key={header.id}
              colSpan={header.colSpan}
              className={cn(
                "whitespace-normal break-words text-center select-none border p-1 text-xs xs:text-sm lg:text-start min-w-8 lg:text-base lg:font-semibold lg:px-2",
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
