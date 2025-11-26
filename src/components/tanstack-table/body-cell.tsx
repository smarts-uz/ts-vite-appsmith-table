import { useRef, useState, useEffect } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface TableCellHoverProps {
  value: unknown;
}

const TableBodyCell: React.FC<TableCellHoverProps> = ({ value }) => {
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
      {displayValue}
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

export default TableBodyCell;
