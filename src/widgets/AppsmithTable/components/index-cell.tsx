import type { Row } from "@tanstack/react-table";
import type { ItemSize } from "../constants";

type IndexCellProps<TData> = {
  row: Row<TData>;
  size?: ItemSize
};

const IndexCell = <TData,>({ row }: IndexCellProps<TData>) => {
  const index = row.index + 1;

  return <div className="text-center">{index}</div>;
};
export default IndexCell;
