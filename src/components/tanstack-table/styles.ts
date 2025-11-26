import { ItemSize } from "@/constants";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

export const bodySizeClasses: Record<ItemSize, string> = {
  xs: "p-0.5 lg:p-1 mx-auto text-center lg:text-center max-w-12",
  sm: "text-xs px-0.5 py-1 leading-4 lg:p-1 lg:text-sm",
  md: "text-sm p-1 leading-5 lg:p-2 lg:text-base",
  lg: "text-base font-bold p-2 leading-6 lg:px-4 lg:py-2 lg:text-lg",
};

export const headSizeClasses: Record<ItemSize, string> = {
  xs: "p-0.5 lg:p-1 mx-auto text-center lg:text-center max-w-12 text-sm ",
  sm: " text-sm font-semibold lg:text-sm",
  md: "text-sm font-semibold p-1 lg:p-2 lg:text-base",
  lg: "text-base font-bold p-2 lg:px-4 lg:py-2 lg:text-lg",
};

export const getCommonPinningStyles = (column: any): CSSProperties => ({
  left:
    column.getIsPinned() === "left"
      ? `${column.getStart("left")}px`
      : undefined,
  right:
    column.getIsPinned() === "right"
      ? `${column.getAfter("right")}px`
      : undefined,
  width: column.getSize(),
});

export const getCommonPinningClasses = (column: any, className?: string) => {
  const isPinned = column.getIsPinned();

  return cn(
    isPinned &&
      "sticky right-0 z-10 bg-inherit max-w-12 outline outline-[var(--border)]",
    className
  );
};
