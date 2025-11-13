import { isEmpty } from "lodash";
import { Input } from "@/components/ui/input";
import type { Column } from "@tanstack/react-table";

type TableFilterIdProps<TData> = {
  column: Column<TData, string | number | undefined>;
  columnFilterValue: string | number | undefined;
  filterId: string;
  headerText: string;
  t: (key: string, opts?: Record<string, any>) => string;
};

// TODO Fix EXACT MATCHING

export function TableFilterId<TData>({
  column,
  columnFilterValue,
  filterId,
  headerText,
  t,
}: TableFilterIdProps<TData>) {
  const handleChange = (value: string) => {
    column.setFilterValue(isEmpty(value) ? undefined : value.trim());
  };

  return (
    <Input
      id={filterId}
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      value={columnFilterValue ?? ""}
      onChange={(e) => handleChange(e.target.value)}
      placeholder={t("filterIdPlaceholder", { headerText })}
      aria-label={t("filterIdAriaLabel", { headerText })}
      className="w-full max-w-xs"
    />
  );
}
