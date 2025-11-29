import { Button, type ButtonVariant } from "@/components/ui/button";
import type { ActionColumn, TriggerEvent } from "../../types";
import type { Row } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { MouseEvent } from "react";
import { cn } from "@/lib/utils";

type ActionCellProps<TData> = {
  row: Row<TData>;
  actionColumn: ActionColumn;
  triggerEvent: TriggerEvent;
  type?: ButtonVariant;
  locale: string;
};

export function ActionCell<TData>({
  row,
  type,
  actionColumn,
  triggerEvent,
  locale,
}: ActionCellProps<TData>) {
  const handleAction = (
    eventName: string,
    e: MouseEvent<HTMLButtonElement | HTMLDivElement>
  ) => {
    e.stopPropagation();
    if (triggerEvent) {
      triggerEvent(eventName, { row: row.original });
    }
  };

  const onlyOne = actionColumn?.actions?.length === 1;

  const renderIcon = (iconName?: keyof typeof LucideIcons) => {
    const Icon =
      iconName && LucideIcons[iconName]
        ? (LucideIcons[iconName] as LucideIcon)
        : LucideIcons.Info;
    return <Icon className="w-5 h-5 text-inherit" />;
  };

  if (onlyOne) {
    const action = actionColumn?.actions[0];
    return (
      <Button
        variant={type || "default"}
        size="icon"
        className={cn(
          "w-full min-w-8 h-full p-2 flex items-center gap-2",
          action?.className
        )}
        onClick={(e) => handleAction(action.onClick, e)}
      >
        {renderIcon(action.icon as keyof typeof LucideIcons)}
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          asChild
          size="icon"
          variant={type || "default"}
          className="w-full h-full p-2 min-w-8 mx-auto"
        >
          {renderIcon(
            (actionColumn?.icon as keyof typeof LucideIcons) || "MoreHorizontal"
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className={"w-64"}>
        {actionColumn?.actions?.map((action, i) => (
          <DropdownMenuItem
            key={i}
            className={cn(
              "flex items-center gap-2 text-base font-semibold",
              action?.className
            )}
            onClick={(e) => handleAction(action.onClick, e)}
          >
            {renderIcon(action.icon as keyof typeof LucideIcons)}
            {action.title[locale]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
