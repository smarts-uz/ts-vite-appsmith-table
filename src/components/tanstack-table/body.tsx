import { cn } from "@/lib/utils";
import { TableBody, TableRow, TableCell } from "../ui/table";
import type { Table, RowData, Row } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import type { TableBodyStyles, UpdateModel, TriggerEvent } from "@/types/index";
import { ItemSize } from "@/constants";
import {
  getCommonPinningStyles,
  getCommonPinningClasses,
  sizeClasses,
} from "./styles";
import { type AppsmithColumnMeta } from "@/types/index";

type BodyProps<TData extends RowData> = {
  table: Table<TData>;
  styles?: TableBodyStyles;
  updateModel?: UpdateModel;
  triggerEvent?: TriggerEvent;
  rowSelectionAction?: string;
};

function TanstackTableBody<TData extends RowData>({
  table,
  styles,
  updateModel,
  triggerEvent,
  rowSelectionAction,
}: BodyProps<TData>) {
  const handleRowSelection = (row: Row<TData>) => {
    row.getToggleSelectedHandler();
    const selectedRow = row.original;
    updateModel?.({ selectedRow });
    if (selectedRow && rowSelectionAction) {
      triggerEvent?.(rowSelectionAction, { row: selectedRow });
    }
  };
  return (
    <TableBody className={styles?.body}>
      {table.getRowModel().rows.map((row) => (
        <TableRow
          key={row.id}
          onClick={() => handleRowSelection(row)}
          className={cn(
            "odd:bg-background even:bg-secondary",
            row.getIsSelected()
              ? "odd:bg-primary/20 even:bg-primary/20 hover:bg-primary/30"
              : "",
            row.getCanSelect()
              ? "cursor-pointer"
              : "cursor-not-allowed bg-muted",
            styles?.row
          )}
        >
          {row.getVisibleCells().map((cell) => (
            <TableCell
              key={cell.id}
              className={cn(
                "whitespace-normal break-words border text-center lg:text-start max-w-96 relative",
                getCommonPinningClasses(cell.column),
                sizeClasses[
                  (cell.column.columnDef.meta as AppsmithColumnMeta)?.size ||
                    ItemSize.md
                ],
                styles?.cell
              )}
              style={getCommonPinningStyles(cell.column)}
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
