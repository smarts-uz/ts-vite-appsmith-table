import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface TableCellHoverProps {
  value: unknown;
}

export const TableCell: React.FC<TableCellHoverProps> = ({ value }) => {
  console.log("val", value);
  const displayValue =
    typeof value === "object" ? JSON.stringify(value) : String(value);

  return (
    <HoverCard>
      <HoverCardTrigger className="line-clamp-1 text-black">
        {displayValue}
      </HoverCardTrigger>
      <HoverCardContent className="lg:w-80 break-words">
        {displayValue}
      </HoverCardContent>
    </HoverCard>
  );
};
