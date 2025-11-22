import { Button } from "@/components/ui/button";
import type { RowAction, TriggerEvent } from "../types";
import type { Row } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ItemSize } from "../constants";

type ActionCellProps<TData> = {
  row: Row<TData>;
  rowActions: RowAction[];
  triggerEvent: TriggerEvent;
  size?: ItemSize;
};

// Fallback icon
const ICON_FALLBACK = LucideIcons.Info;

export function ActionCell<TData>({
  row,
  rowActions,
  triggerEvent,
}: ActionCellProps<TData>) {
  const handleAction = (eventName: string) => {
    if (triggerEvent) {
      triggerEvent(eventName, { row: row.original });
    }
  };

  const onlyOne = rowActions?.length === 1;

  const renderIcon = (iconName?: keyof typeof LucideIcons) => {
    const Icon =
      iconName && LucideIcons[iconName]
        ? (LucideIcons[iconName] as LucideIcon)
        : ICON_FALLBACK;
    return <Icon className="w-5 h-5" />;
  };

  if (onlyOne) {
    const action = rowActions[0];
    return (
      <Button
        variant="ghost"
        size="sm"
        className="w-full min-w-6 h-full p-2 flex items-center gap-2"
        onClick={() => handleAction(action.onClick)}
      >
        {renderIcon(action.icon as keyof typeof LucideIcons)}
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="min-w-8 mx-auto">
        <Button variant="ghost" asChild size="sm" className="w-full h-full p-2">
          <LucideIcons.MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64">
        {rowActions.map((action, i) => (
          <DropdownMenuItem
            key={i}
            className="flex items-center gap-2 text-base font-semibold"
            onClick={() => handleAction(action.onClick)}
          >
            {renderIcon(action.icon as keyof typeof LucideIcons)}
            {action.title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
