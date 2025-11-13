import { Button } from "@/components/ui/button";
import type { RowAction } from "../types";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export const IndexCell = ({
  row,
  table,
  enablePagination,
}: {
  row: any;
  table: any;
  enablePagination?: boolean;
}) => {
  const { pageIndex, pageSize } = table.getState().pagination;
  const index = enablePagination
    ? pageIndex * pageSize + row.index + 1
    : row.index + 1;
  return <div className="text-center">{index}</div>;
};

export const ActionCell = ({
  // row,
  rowActions,
}: {
  row: any;
  rowActions: RowAction[];
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="w-full h-full">
          <span className="icon icon-circle-ellipsis" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        {rowActions.map((action, i) => (
          <DropdownMenuItem
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              // action.onClick(row.original);
            }}
          >
            {action.title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
