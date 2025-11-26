import { type Column } from "@tanstack/react-table";
import { ChevronsUpDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ChevronsDown, ChevronsUp } from "lucide-react";
import { type SortDirection } from "@tanstack/react-table";
import type { TableHeadStyles } from "@/types/index";
import { cn } from "@/lib/utils";

type TableHeaderProps<TData> = {
  column: Column<TData, any>;
  title: string;
  styles?: TableHeadStyles;
};

function TableHeader<TData>({
  column,
  title,
  styles,
}: TableHeaderProps<TData>) {
  const isSorted = column.getIsSorted(); // "asc" | "desc" | false

  return (
    <Badge
      variant="outline"
      className={cn(
        "cursor-pointer rounded lg:px-2 lg:py-1 border-none hover:bg-primary/10 text-xs md:text-sm lg:text-base font-semibold capitalize select-none flex items-center",
        styles?.container
      )}
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
        <SortingIcon sortOrder={isSorted} className={styles?.icon} />
      ) : column.getCanSort() ? (
        <ChevronsUpDown
          className={cn("hidden min-w-4 size-4 sm:inline-block", styles?.icon)}
        />
      ) : null}
    </Badge>
  );
}

export default TableHeader;

type SortingIconProps = {
  sortOrder: SortDirection;
  className?: string;
};

const SortingIcon = ({ sortOrder, className }: SortingIconProps) => {
  switch (sortOrder) {
    case "asc":
      return (
        <ChevronsDown
          className={cn(
            "text-foreground hidden size-4 sm:inline-block",
            className
          )}
        />
      );
    case "desc":
      return (
        <ChevronsUp
          className={cn(
            "text-foreground hidden size-4 sm:inline-block",
            className
          )}
        />
      );
    default:
      return null;
  }
};
