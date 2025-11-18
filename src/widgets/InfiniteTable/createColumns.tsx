import type { ColumnDef } from "@tanstack/react-table";
import { ActionCell } from "./components/action-cell";
import { ItemSize } from "./constants";
import { TableModelSchema, type AppsmithColumnMeta } from "./types";
import type z from "zod";
import TableHeader from "./components/table-header";
import { TableCell } from "./components/table-cell";

const CreateColumns = TableModelSchema.omit({
  fetcher: true,
  translations: true,
  rowSelectionAction: true,
  updateModel: true,
});

type CreateColumnsProps = z.infer<typeof CreateColumns>;

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
      meta: {
        size: ItemSize.xs,
      },
      cell: ({ row }) => row.index + 1,
    });
  }

  const autoCols = Object.entries(schema)
    .map(([colKey, colSchema]) => {
      const { type, sort, filter, size = ItemSize.md, title } = colSchema;
      const headerText = title || colKey[0].toUpperCase() + colKey.slice(1);

      const colDef: ColumnDef<TData> = {
        accessorKey: colKey,
        header: ({ column }) => (
          <TableHeader column={column} title={headerText} />
        ),
        enableSorting: sort,
        enableColumnFilter: filter,
        meta: {
          filterVariant: filter ? type : null,
          headerText,
          size,
        } as AppsmithColumnMeta,
        cell: (info) => <TableCell value={String(info.getValue() ?? "")} />,
      };

      return colDef;
    })
    .filter(Boolean) as ColumnDef<TData>[];

  const actionColumns: ColumnDef<TData>[] = [];
  if (actionColumn?.enable && rowActions.length > 0) {
    actionColumns.push({
      id: "actions",
      header: "",
      meta: {
        size: ItemSize.xs,
      },
      cell: ({ row }) => (
        <ActionCell
          size={actionColumn?.size || ItemSize.sm}
          triggerEvent={triggerEvent}
          row={row}
          rowActions={rowActions}
        />
      ),
    });
  }
  return [...indexColumns, ...autoCols, ...actionColumns];
}
