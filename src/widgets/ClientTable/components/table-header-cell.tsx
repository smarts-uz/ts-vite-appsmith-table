import { type Column } from "@tanstack/react-table";
import { SortingIcon } from "./sorting-icon";
import { ChevronsUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type TableHeaderProps<TData> = {
  column: Column<TData, any>;
  title: string;
};

function TableHeader<TData>({ column, title }: TableHeaderProps<TData>) {
  const isSorted = column.getIsSorted(); // "asc" | "desc" | false

  return (
    <Badge
      variant="outline"
      className="cursor-pointer rounded lg:px-2 lg:py-1 border-none hover:bg-primary/10 text-xs md:text-sm lg:text-base font-semibold capitalize select-none flex items-center"
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
    </Badge>
  );
}

export default TableHeader;
