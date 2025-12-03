import type { ColumnDef } from "@tanstack/react-table";
import { ActionCell } from "./components/tanstack-table/action-cell";
import { ItemSize } from "./constants";
import { TableModelSchema, type AppsmithColumnMeta } from "./types";
import type z from "zod";
import TableBodyCell from "./components/tanstack-table/body-cell";

const CreateColumns = TableModelSchema.omit({
  rowSelectionAction: true,
  tableData: true,
  limit: true,
  max_count: true,
  styles: true,
  onModelChange: true,
});

type CreateColumnsProps = z.infer<typeof CreateColumns>;

export function createColumns<TData>({
  schema,
  indexColumn,
  actionColumn,
  updateModel,
  locale,
  triggerEvent,
}: CreateColumnsProps): ColumnDef<TData>[] {
  const indexColumns: ColumnDef<TData>[] = [];
  if (indexColumn?.enable) {
    indexColumns.push({
      id: "index",
      header: "№",
      meta: {
        size: ItemSize.xs,
      },
      cell: ({ row }) => (
        <span className={indexColumn?.className}>{row.index + 1}</span>
      ),
    });
  }

  const autoCols = Object.entries(schema)
    .map(([colKey, colSchema]) => {
      const { size = ItemSize.md, title, className } = colSchema;
      const headerText = title
        ? title[locale]
        : colKey[0].toUpperCase() + colKey.slice(1);

      const colDef: ColumnDef<TData> = {
        accessorKey: colKey,
        header: headerText,
        meta: {
          headerText,
          size,
        } as AppsmithColumnMeta,
        cell: (info) => (
          <TableBodyCell
            value={info.getValue()}
            type={colSchema.type || "text"}
            triggerEvent={triggerEvent}
            className={className}
          />
        ),
      };

      return colDef;
    })
    .filter(Boolean) as ColumnDef<TData>[];

  const actionColumns: ColumnDef<TData>[] = [];
  if (actionColumn?.enable && actionColumn.actions.length > 0) {
    actionColumns.push({
      id: "actions",
      header: "",
      meta: {
        size: ItemSize.xs,
      },
      cell: ({ row }) => (
        <ActionCell
          updateModel={updateModel}
          type={actionColumn.type}
          triggerEvent={triggerEvent}
          row={row}
          locale={locale}
          actionColumn={actionColumn}
        />
      ),
    });
  }

  return [...indexColumns, ...autoCols, ...actionColumns];
}
