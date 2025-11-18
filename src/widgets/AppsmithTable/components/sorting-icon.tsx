import { ChevronsDown, ChevronsUp } from "lucide-react";
import { type SortDirection } from "@tanstack/react-table";

type SortingIconProps = {
  sortOrder: SortDirection;
};

export const SortingIcon = ({ sortOrder }: SortingIconProps) => {
  switch (sortOrder) {
    case "asc":
      return (
        <ChevronsDown className="text-foreground dark:text-primary hidden size-4 sm:inline-block" />
      );
    case "desc":
      return (
        <ChevronsUp className="text-foreground dark:text-primary hidden size-4 sm:inline-block" />
      );
    default:
      return null;
  }
};
