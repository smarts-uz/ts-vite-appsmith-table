import type { Row } from "@tanstack/react-table";

type IndexCellProps<TData> = {
  row: Row<TData>;
};

const IndexCell = <TData,>({ row }: IndexCellProps<TData>) => {
  const index = row.index + 1;

  return <div className="text-center">{index}</div>;
};
export default IndexCell;
