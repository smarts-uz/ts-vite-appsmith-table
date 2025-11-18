import { isEmpty } from "lodash";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import type { Column } from "@tanstack/react-table";

type Option = {
  value: string;
  title: string;
};

type TableFilterEnumProps<TData> = {
  column: Column<TData, any>;
  columnFilterValue: any;
  filterId: string;
  headerText: string;
  t: (key: string, opts?: Record<string, any>) => string;
};

export function TableFilterEnum<TData>({
  column,
  columnFilterValue,
  filterId,
  headerText,
  t,
}: TableFilterEnumProps<TData>) {
  const options: Option[] =
    column.columnDef.meta && "options" in column.columnDef.meta
      ? (column.columnDef.meta as { options: Option[] }).options
      : [];

  const currentValue =
    typeof columnFilterValue === "object" && columnFilterValue !== null
      ? columnFilterValue.eq
      : columnFilterValue;

  const handleChange = (value: string) => {
    column.setFilterValue(isEmpty(value) ? undefined : value);
  };

  return (
    <Select
      value={isEmpty(currentValue) ? "" : String(currentValue)}
      onValueChange={handleChange}
    >
      <SelectTrigger
        id={filterId}
        aria-label={t("filterAriaLabel", { headerText })}
        className="w-full max-w-xs"
      >
        <SelectValue placeholder={t("filterPlaceholder", { headerText })} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="">{t("all")}</SelectItem>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
