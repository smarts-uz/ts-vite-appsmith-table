import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type SkeletonProps = { rows?: number; cols?: number };

function CustomTable({ cols = 6, rows = 20 }) {
  return (
    <Table className="overflow-hidden">
      <TableHeader>
        <TableRow className="border-border hover:bg-transparent">
          {[...Array(cols)].map((_, index) => (
            <TableHead key={index}>
              <Skeleton className="h-5 w-2/3 lg:w-24 xl:w-24" />
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody className="">
        {[...Array(rows)].map((_, rowIndex) => (
          <TableRow
            key={rowIndex}
            className="border-border hover:bg-transparent"
          >
            {[...Array(cols)].map((_, colIndex) => (
              <TableCell key={colIndex}>
                <Skeleton className="h-6 w-full md:w-32 lg:w-40" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export const SkeletonTable = (props: SkeletonProps) => {
  return (
    <Card>
      <CardHeader className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {[...Array(6)].map((_, index) => (
          <Skeleton key={index} className="h-10 w-full rounded-md" />
        ))}
      </CardHeader>
      <CardContent>
        <CustomTable {...props} />
      </CardContent>
    </Card>
  );
};
