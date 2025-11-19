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
      <HoverCardTrigger className="line-clamp-2 text-black">
        {displayValue}
      </HoverCardTrigger>
      <HoverCardContent className="max-w-xs lg:max-w-lg break-words">
        {displayValue}
      </HoverCardContent>
    </HoverCard>
  );
};
