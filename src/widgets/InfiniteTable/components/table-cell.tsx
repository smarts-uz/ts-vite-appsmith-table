import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface TableCellHoverProps {
  value: string;
}

export const TableCell: React.FC<TableCellHoverProps> = ({ value }) => {
  console.log("val", value);

  return (
    <HoverCard>
      <HoverCardTrigger className="line-clamp-2 text-black">
        {value}
      </HoverCardTrigger>
      <HoverCardContent className="max-w-xs lg:max-w-lg break-words">
        {value}
      </HoverCardContent>
    </HoverCard>
  );
};
