import { isEmpty } from "lodash";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import type { Column } from "@tanstack/react-table";

type TableFilterBooleanProps<TData> = {
  column: Column<TData, unknown>;
  columnFilterValue: boolean | string | null | undefined;
  filterId: string;
  headerText: string;
  t: (key: string, opts?: Record<string, any>) => string;
};

export function TableFilterBoolean<TData>({
  column,
  columnFilterValue,
  filterId,
  headerText,
  t,
}: TableFilterBooleanProps<TData>) {
  const handleChange = (value: string) => {
    if (isEmpty(value)) {
      column.setFilterValue(undefined);
    } else {
      column.setFilterValue(value === "true");
    }
  };

  return (
    <Select
      value={isEmpty(columnFilterValue) ? "" : String(columnFilterValue)}
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
        <SelectItem value="true">{t("true")}</SelectItem>
        <SelectItem value="false">{t("false")}</SelectItem>
      </SelectContent>
    </Select>
  );
}
