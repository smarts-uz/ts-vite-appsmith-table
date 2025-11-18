import { type Column } from "@tanstack/react-table";
import { SortingIcon } from "./sorting-icon";
import { ChevronsUpDown } from "lucide-react";

type TableHeaderProps<TData> = {
  column: Column<TData, any>;
  title: string;
};

function TableHeader<TData>({ column, title }: TableHeaderProps<TData>) {
  const isSorted = column.getIsSorted(); // "asc" | "desc" | false

  return (
    <div
      className="cursor-pointer select-none flex justify-between items-center w-full"
      onClick={() => {
        // toggle between "asc", "desc", undefined
        // let nextOrder: SORT_ORDER | undefined;
        // if (isSorted === "asc") nextOrder = SORT_ORDER.desc;
        // else if (isSorted === "desc") nextOrder = undefined;
        // else nextOrder = SORT_ORDER.asc;
        // // trigger server-side fetch
        // triggerServerSort(colKey, nextOrder);
      }}
    >
      {title}
      {isSorted ? (
        <SortingIcon sortOrder={isSorted} />
      ) : column.getCanSort() ? (
        <ChevronsUpDown className="hidden min-w-4 size-4 sm:inline-block" />
      ) : null}
    </div>
  );
}

export default TableHeader;
