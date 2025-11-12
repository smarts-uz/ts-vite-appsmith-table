// components/TableCells.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

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

export const PinCell = ({
  row,
  t,
}: {
  row: any;
  t: (key: string) => string;
}) => {
  return (
    <div className="flex justify-center gap-1">
      {row.getIsPinned() ? (
        <Button
          size="sm"
          variant="ghost"
          onClick={() => row.pin(false)}
          title={t("unpinRow")}
        >
          <span className="icon icon-close" />
        </Button>
      ) : (
        <>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => row.pin("top")}
            title={t("pinToTop")}
          >
            <span className="icon icon-arrow-up-thick" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => row.pin("bottom")}
            title={t("pinToBottom")}
          >
            <span className="icon icon-arrow-down-thick" />
          </Button>
        </>
      )}
    </div>
  );
};

export const ActionCell = ({
  row,
  rowActions,
  openDropdownRowId,
  setOpenDropdownRowId,
  isPinnedLeft,
}: {
  row: any;
  rowActions: { title: string; onClick: (row: any) => void }[];
  openDropdownRowId?: string | null;
  setOpenDropdownRowId?: (id: string | null) => void;
  isPinnedLeft?: boolean;
}) => {
  const isOpen = openDropdownRowId === row.id;
  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenDropdownRowId?.(isOpen ? null : row.id);
  };

  return (
    <DropdownMenu
      open={isOpen}
      onOpenChange={(val) => setOpenDropdownRowId?.(val ? row.id : null)}
    >
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="w-full h-full"
          onClick={toggle}
        >
          <span className="icon icon-circle-ellipsis" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side={isPinnedLeft ? "right" : "left"}
        align="start"
        className="w-56"
      >
        {rowActions.map((action, i) => (
          <DropdownMenuItem
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              action.onClick(row.original);
            }}
          >
            {action.title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
