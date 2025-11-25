import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TableCellHoverProps {
  value: unknown;
}

const TableBodyCell: React.FC<TableCellHoverProps> = ({ value }) => {
  const displayValue =
    typeof value === "object" ? JSON.stringify(value) : String(value);

  if (value === null) {
    return <></>;
  }

  if (displayValue?.length < 30) {
    return <>{displayValue}</>;
  }

  return (
    <Tooltip>
      <TooltipTrigger className="line-clamp-1 text-center max-w-40 md:max-w-64 lg:max-w-full lg:text-start">
        {displayValue}
      </TooltipTrigger>
      <TooltipContent className="max-w-64 lg:max-w-80 break-words">
        {displayValue}
      </TooltipContent>
    </Tooltip>
  );
};

export default TableBodyCell;
