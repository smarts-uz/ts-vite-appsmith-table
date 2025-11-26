import { flexRender } from "@tanstack/react-table";
import type { Table } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { TableHeader, TableHead, TableRow } from "@/components/ui/table";
import type { TableSectionStyles } from "@/types/index";
import {
  getCommonPinningStyles,
  getCommonPinningClasses,
  headSizeClasses,
} from "./styles";
import { type AppsmithColumnMeta } from "@/types/index";
import { ItemSize } from "@/constants";

interface HeadProps<TData> {
  table: Table<TData>;
  styles?: TableSectionStyles;
}

const TanstackTableHead = <TData,>({ table, styles }: HeadProps<TData>) => {
  return (
    <TableHeader
      className={cn(
        "top-0 z-20 sticky bg-card outline-[var(--border)] border-b outline",
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
                getCommonPinningClasses(header.column, "bg-card"),
                headSizeClasses[
                  (header.column.columnDef.meta as AppsmithColumnMeta)?.size ||
                    ItemSize.md
                ],
                styles?.cell
              )}
              onClick={header.column.getToggleSortingHandler()}
              style={getCommonPinningStyles(header.column)}
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
