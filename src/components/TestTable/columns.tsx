import type { ColumnDef } from "@tanstack/react-table";
import { IndexCell, PinCell, ActionCell } from "./TableCells";
import { type ColumnParams, ItemSize } from "./table.types";
import { Sun } from "lucide-react";

export function createColumns<TData>({
  data,
  schema,
  rowIndexColumn,
  rowIndexPin,
  rowIndexSize = ItemSize.xs,
  enablePagination = false,
  enableRowPinning = false,
  rowActions = [],
  actionSize = ItemSize.md,
  actionPin,
  t,
  openDropdownRowId,
  setOpenDropdownRowId,
}: ColumnParams<TData>): ColumnDef<TData>[] {
  if (!data.length) return [];

  const sizeMap = { xs: 40, sm: 80, md: 120, lg: 200 };

  const indexColumns: ColumnDef<TData>[] = [];
  if (rowIndexColumn?.enable) {
    indexColumns.push({
      id: "#",
      header: "#",
      size: sizeMap[rowIndexSize] || 40,
      // @ts-expect-error: 'pin' is not part of ColumnDef, but used by the table implementation
      pin: rowIndexPin,
      cell: ({ row, table }) => (
        <IndexCell
          row={row}
          table={table}
          enablePagination={enablePagination}
        />
      ),
      meta: { textAlign: "center" },
    });
  }

  const pinColumns: ColumnDef<TData>[] = [];
  if (enableRowPinning) {
    pinColumns.push({
      id: "pin",
      header: t("pinRow"),
      size: 60,
      cell: ({ row }) => <PinCell row={row} t={t} />,
      meta: { textAlign: "center" },
    });
  }

  const autoCols = Object.entries(schema)
    .map(([colKey, colSchema]) => {
      const { type, sort, filter, size = "md", textAlign, title } = colSchema;
      const headerText = title || colKey[0].toUpperCase() + colKey.slice(1);

      const colDef: ColumnDef<TData> = {
        accessorKey: colKey,
        header: sort
          ? ({ column }) => (
              <button
                className="flex items-center gap-2"
                onClick={() => column.toggleSorting()}
              >
                {headerText} <Sun />
              </button>
            )
          : headerText,
        size: sizeMap[size] || 120,
        enableSorting: sort,
        enableColumnFilter: filter,
        meta: {
          filterVariant: filter ? type : null,
          headerText,
          size,
          textAlign,
        },
        cell: (info) => String(info.getValue() ?? ""),
      };

      // add type-specific filters & rendering here...
      return colDef;
    })
    .filter(Boolean) as ColumnDef<TData>[];

  const actionColumns: ColumnDef<TData>[] = [];
  if (rowIndexColumn?.enable && rowActions.length) {
    actionColumns.push({
      id: "actions",
      header: "",
      size: sizeMap[actionSize] || 80,
      // @ts-expect-error 'pin' is not a known property of ColumnDef but is used for custom logic
      pin: actionPin,
      cell: ({ row, column }) => (
        <ActionCell
          row={row}
          rowActions={rowActions}
          openDropdownRowId={openDropdownRowId}
          setOpenDropdownRowId={setOpenDropdownRowId}
          isPinnedLeft={column.getIsPinned() === "left"}
        />
      ),
    });
  }

  return [...pinColumns, ...indexColumns, ...autoCols, ...actionColumns];
}
