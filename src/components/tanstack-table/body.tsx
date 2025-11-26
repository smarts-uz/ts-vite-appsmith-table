import { cn } from "@/lib/utils";
import { TableBody, TableRow, TableCell } from "../ui/table";
import type { Table, RowData, Row } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import type {
  TableSectionStyles,
  UpdateModel,
  TriggerEvent,
} from "@/types/index";
import { ItemSize } from "@/constants";
import {
  getCommonPinningStyles,
  getCommonPinningClasses,
  bodySizeClasses,
} from "./styles";
import { type AppsmithColumnMeta } from "@/types/index";
import React from "react";

type BodyProps<TData extends RowData> = {
  table: Table<TData>;
  styles?: TableSectionStyles;
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
  const [rowSelection, setRowSelection] = React.useState<TData | null>(null);

  const handleRowSelection = (row: Row<TData>) => {
    const selectedRow = row.original;
    setRowSelection(selectedRow);
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
          data-selected={rowSelection === row.original}
          className={cn(
            "odd:bg-background even:bg-secondary h-12",
            styles?.row
          )}
        >
          {row.getVisibleCells().map((cell) => (
            <TableCell
              key={cell.id}
              className={cn(
                "whitespace-normal break-words border text-center lg:text-start max-w-96 relative",
                getCommonPinningClasses(cell.column),
                bodySizeClasses[
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
