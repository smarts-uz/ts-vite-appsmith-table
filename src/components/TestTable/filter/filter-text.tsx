import { isEmpty } from "lodash";
import { Input } from "@/components/ui/input";
import type { Column } from "@tanstack/react-table";

type TableFilterTextProps<TData> = {
  column: Column<TData, string | undefined>;
  columnFilterValue: string | undefined;
  filterId: string;
  headerText: string;
  t: (key: string, opts?: Record<string, any>) => string;
};

export function TableFilterText<TData>({
  column,
  columnFilterValue,
  filterId,
  headerText,
  t,
}: TableFilterTextProps<TData>) {
  const handleChange = (value: string) => {
    column.setFilterValue(isEmpty(value) ? undefined : value);
  };

  return (
    <Input
      id={filterId}
      type="text"
      value={columnFilterValue ?? ""}
      onChange={(e) => handleChange(e.target.value)}
      placeholder={t("filterPlaceholder", { headerText })}
      aria-label={t("filterAriaLabel", { headerText })}
      className="w-full max-w-xs"
    />
  );
}
