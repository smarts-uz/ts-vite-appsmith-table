import { useRef, useState, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { ColumnType } from "@/types";
import { formatUzPhone, formatDate, formatDateTime } from "@/lib/formatters";

interface TableCellHoverProps {
  value: unknown;
  type: ColumnType;
}

const TableBodyCell: React.FC<TableCellHoverProps> = ({ value, type }) => {
  const displayValue =
    typeof value === "object" ? JSON.stringify(value) : String(value);
  const cellRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const el = cellRef.current;
    if (el) {
      setIsOverflowing(el.scrollWidth > el.clientWidth);
    }
  }, [displayValue]);

  if (value === null) {
    return <></>;
  }

  const content = (
    <div
      ref={cellRef}
      className="truncate text-center max-w-[160px] md:max-w-[256px] lg:max-w-[320px] lg:text-start"
    >
      {renderCell(displayValue, type)}
    </div>
  );

  return isOverflowing ? (
    <Popover>
      <PopoverTrigger
        className="h-min max-w-40 md:max-w-64 lg:max-w-full lg:text-start"
        onClick={(e) => e.stopPropagation()}
        title={displayValue}
      >
        {content}
      </PopoverTrigger>
      <PopoverContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        align="center"
        className="w-64 lg:w-80 break-words"
      >
        {displayValue}
      </PopoverContent>
    </Popover>
  ) : (
    content
  );
};

const renderCell = (value: unknown, type: ColumnType) => {
  switch (type) {
    case "text":
      return String(value);
    case "url":
      const [text, url] = String(value).split("|||");

      return (
        <a href={url} target="_blank" className="text-primary underline">
          {text}
        </a>
      );
    case "phone":
      return formatUzPhone(String(value));
    case "date":
      return formatDate(value as string);
    case "datetime":
      return formatDateTime(value as string);
    case "currency":
      return Number(value).toLocaleString("uz-UZ");
    default:
      return String(value);
  }
};

export default TableBodyCell;
