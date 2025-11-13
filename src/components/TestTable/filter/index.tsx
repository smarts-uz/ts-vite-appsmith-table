import type { Column } from "@tanstack/react-table";

import { TableFilterText } from "./filter-text";
import { TableFilterBoolean } from "./filter-bool";
import { TableFilterNumber } from "./filter-num";
import { TableFilterEnum } from "./filter-enum";
import { ColumnType } from "@/types/schema";
import { TableFilterId } from "./filter-id";

type TableFiltersProps<TData> = {
  column: Column<TData, any>;
  t: (key: string, opts?: Record<string, any>) => string;
};

export function TableFilters<TData>({ column, t }: TableFiltersProps<TData>) {
  const meta =
    (column.columnDef.meta as {
      filterVariant?: ColumnType;
      headerText?: string;
    }) ?? {};
  const { filterVariant } = meta;
  const columnFilterValue = column.getFilterValue();
  const header = column.columnDef.header;
  const headerText = typeof header === "string" ? header : column.id;

  const filterId = `filter-${column.id}`;

  const renderFilter = () => {
    switch (filterVariant) {
      case ColumnType.ID:
        return (
          <TableFilterId
            column={column}
            columnFilterValue={
              typeof columnFilterValue === "string" ||
              typeof columnFilterValue === "undefined"
                ? columnFilterValue
                : undefined
            }
            filterId={filterId}
            headerText={headerText}
            t={t}
          />
        );
      case ColumnType.TEXT:
        return (
          <TableFilterText
            column={column}
            columnFilterValue={
              typeof columnFilterValue === "string" ||
              typeof columnFilterValue === "undefined"
                ? columnFilterValue
                : undefined
            }
            filterId={filterId}
            headerText={headerText}
            t={t}
          />
        );
      case ColumnType.NUMBER:
      case ColumnType.CURRENCY:
        return (
          <TableFilterNumber
            column={column}
            columnFilterValue={
              (typeof columnFilterValue === "object" &&
                columnFilterValue !== null) ||
              typeof columnFilterValue === "undefined"
                ? (columnFilterValue as Exclude<typeof columnFilterValue, null>)
                : undefined
            }
            filterId={filterId}
            headerText={headerText}
            t={t}
          />
        );
      case ColumnType.ENUM:
        return (
          <TableFilterEnum
            column={column}
            columnFilterValue={columnFilterValue}
            filterId={filterId}
            headerText={headerText}
            t={t}
          />
        );
      case ColumnType.BOOL:
        return (
          <TableFilterBoolean
            column={column}
            columnFilterValue={
              typeof columnFilterValue === "boolean" ||
              typeof columnFilterValue === "string" ||
              typeof columnFilterValue === "undefined" ||
              columnFilterValue === null
                ? columnFilterValue
                : undefined
            }
            filterId={filterId}
            headerText={headerText}
            t={t}
          />
        );
      default:
        return null;
    }
  };

  return <div className="form-control">{renderFilter()}</div>;
}
