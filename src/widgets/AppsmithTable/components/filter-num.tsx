import { isEmpty } from "lodash";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import type { Column } from "@tanstack/react-table";

type NumberFilterValue = {
  min?: number;
  max?: number;
};

type TableFilterNumberProps<TData> = {
  column: Column<TData, NumberFilterValue | undefined>;
  columnFilterValue: NumberFilterValue | undefined;
  filterId: string;
  headerText: string;
  t: (key: string, opts?: Record<string, any>) => string;
};

const EMPTY_OPTION = "__all__"; // sentinel value for "no filter"

export function TableFilterNumber<TData>({
  column,
  columnFilterValue,
  filterId,
  headerText,
  t,
}: TableFilterNumberProps<TData>) {
  const minId = `${filterId}-min`;
  const maxId = `${filterId}-max`;
  // @ts-expect-error: meta options injected at runtime
  const minOptions = column.columnDef.meta?.minOptions ?? [];
  // @ts-expect-error: meta options injected at runtime
  const maxOptions = column.columnDef.meta?.maxOptions ?? [];

  const handleMinChange = (value: string) => {
    column.setFilterValue((old = {}) => ({
      ...old,
      min: value === EMPTY_OPTION ? undefined : Number(value),
    }));
  };

  const handleMaxChange = (value: string) => {
    column.setFilterValue((old = {}) => ({
      ...old,
      max: value === EMPTY_OPTION ? undefined : Number(value),
    }));
  };

  /*
    TODO: Fix why columnFilterValue is not working
  
  */
  console.log("column", columnFilterValue);
  const minValue = isEmpty(columnFilterValue?.min)
    ? EMPTY_OPTION
    : String(columnFilterValue?.min);
  const maxValue = isEmpty(columnFilterValue?.max)
    ? EMPTY_OPTION
    : String(columnFilterValue?.max);

  return (
    <div className="flex items-center gap-2">
      <Select value={minValue} onValueChange={handleMinChange}>
        <SelectTrigger
          id={minId}
          aria-label={t("numberMinAriaLabel", { headerText })}
          className="w-full max-w-xs"
        >
          <SelectValue placeholder={t("min")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={EMPTY_OPTION}>{t("all")}</SelectItem>
          {minOptions.map((item: number) => (
            <SelectItem key={item} value={String(item)}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <span>-</span>

      <Select value={maxValue} onValueChange={handleMaxChange}>
        <SelectTrigger
          id={maxId}
          aria-label={t("numberMaxAriaLabel", { headerText })}
          className="w-full max-w-xs"
        >
          <SelectValue placeholder={t("max")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={EMPTY_OPTION}>{t("all")}</SelectItem>
          {maxOptions.map((item: number) => (
            <SelectItem key={item} value={String(item)}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
