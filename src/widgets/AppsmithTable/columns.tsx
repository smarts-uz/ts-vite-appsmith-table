import type { ColumnDef } from "@tanstack/react-table";
import { IndexCell, ActionCell } from "./components/cells";
import { type ColumnParams } from "./types";
import { ItemSize } from "./constants";

export function createColumns<TData>({
  data,
  schema,
  indexRow,
  rowActions = [],
  actionColumn,
}: ColumnParams<TData>): ColumnDef<TData>[] {
  if (!data.length) return [];

  const sizeMap = { xs: 40, sm: 80, md: 120, lg: 160, xl: 200 };

  const indexColumns: ColumnDef<TData>[] = [];
  if (indexRow?.enable) {
    indexColumns.push({
      id: "#",
      header: "#",
      size: sizeMap[indexRow.size] || sizeMap.xs,
      // @ts-expect-error: 'pin' is not part of ColumnDef, but used by the table implementation
      pin: indexRow.pin,
      cell: ({ row, table }) => <IndexCell row={row} table={table} />,
    });
  }

  const pinColumns: ColumnDef<TData>[] = [];
  const autoCols = Object.entries(schema)
    .map(([colKey, colSchema]) => {
      const {
        type,
        sort,
        filter,
        size = ItemSize.md,
        title,
      } = colSchema;
      const headerText = title || colKey[0].toUpperCase() + colKey.slice(1);

      const colDef: ColumnDef<TData> = {
        accessorKey: colKey,
        header: sort
          ? ({ column }) => (
              <span onClick={() => column.toggleSorting()}>{headerText}</span>
            )
          : headerText,
        size: sizeMap[size] || sizeMap.lg,
        enableSorting: sort,
        enableColumnFilter: filter,
        meta: {
          filterVariant: filter ? type : null,
          headerText,
          size,
        },
        cell: (info) => String(info.getValue() ?? ""),
      };

      // add type-specific filters & rendering here...
      return colDef;
    })
    .filter(Boolean) as ColumnDef<TData>[];

  const actionColumns: ColumnDef<TData>[] = [];
  if (indexRow?.enable && rowActions.length) {
    actionColumns.push({
      id: "actions",
      header: "",
      size: sizeMap[actionColumn?.size || ItemSize.md],
      // @ts-expect-error 'pin' is not a known property of ColumnDef but is used for custom logic
      pin: actionPin,
      cell: ({ row }) => <ActionCell row={row} rowActions={rowActions} />,
    });
  }

  return [...pinColumns, ...indexColumns, ...autoCols, ...actionColumns];
}
