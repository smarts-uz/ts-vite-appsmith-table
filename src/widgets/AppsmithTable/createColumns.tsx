import type { ColumnDef } from "@tanstack/react-table";
import { ActionCell } from "./components/action-cell";
import { ItemSize, SIZE_MAP } from "./constants";
import IndexCell from "./components/index-cell";
import { TableModelSchema, type TriggerEvent } from "./types";
import type z from "zod";

const CreateColumns = TableModelSchema.omit({
  fetcher: true,
  translations: true,
  rowSelectionAction: true,
});

type CreateColumnsProps = z.infer<typeof CreateColumns> & {
  triggerEvent: TriggerEvent;
};

export function createColumns<TData>({
  schema,
  indexRow,
  rowActions = [],
  actionColumn,
  triggerEvent,
}: CreateColumnsProps): ColumnDef<TData>[] {
  const indexColumns: ColumnDef<TData>[] = [];
  if (indexRow?.enable) {
    indexColumns.push({
      id: "#",
      size: SIZE_MAP[indexRow.size || ItemSize.xs],
      cell: ({ row, table }) => <IndexCell row={row} table={table} />,
    });
  }

  const autoCols = Object.entries(schema)
    .map(([colKey, colSchema]) => {
      const { type, sort, filter, size = ItemSize.md, title } = colSchema;
      const headerText = title || colKey[0].toUpperCase() + colKey.slice(1);

      const colDef: ColumnDef<TData> = {
        accessorKey: colKey,
        header: sort
          ? ({ column }) => (
              <span onClick={() => column.toggleSorting()}>{headerText}</span>
            )
          : headerText,
        size: SIZE_MAP[size || ItemSize.md],
        enableSorting: sort,
        enableColumnFilter: filter,
        meta: {
          filterVariant: filter ? type : null,
          headerText,
          size,
        },
        cell: (info) => String(info.getValue() ?? ""),
      };

      return colDef;
    })
    .filter(Boolean) as ColumnDef<TData>[];

  const actionColumns: ColumnDef<TData>[] = [];
  if (actionColumn?.enable && rowActions.length > 0) {
    actionColumns.push({
      id: "actions",
      header: "",
      size: SIZE_MAP[actionColumn?.size || ItemSize.md],
      cell: ({ row }) => (
        <ActionCell
          triggerEvent={triggerEvent}
          row={row}
          rowActions={rowActions}
        />
      ),
    });
  }
  return [...indexColumns, ...autoCols, ...actionColumns];
}
