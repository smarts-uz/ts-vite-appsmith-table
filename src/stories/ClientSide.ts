import "../tailwind.css";
import type {
  RowAction,
  Schema,
  TableModel,
} from "../widgets/InfiniteTable/types";
import { ItemSize, ColumnType } from "../widgets/InfiniteTable/constants";
import { PinDirection } from "../widgets/InfiniteTable/constants";

const postsSchema: Schema = {
  id: {
    type: ColumnType.TEXT,
    title: "ID",
    sort: true,
    filter: true,
  },
  age: {
    type: ColumnType.NUMBER,
    title: "Age",
    sort: true,
    filter: true,
  },
  username: {
    type: ColumnType.TEXT,
    title: "Name",
    sort: true,
    filter: true,
  },
  university: {
    type: ColumnType.TEXT,
    title: "University",
    sort: false,
    filter: true,
  },
};

const postsRowActions: RowAction[] = [
  { title: "Korish", onClick: "onClick", icon: "Activity" },
  { title: "Qoshish", onClick: "onKomol", icon: "AlarmClockPlus" },
  { title: "Tolov", onClick: "onClick" },
];

export const ClientSideProps: TableModel = {
  fetcher: {
    url: "https://dummyjson.com/users",
    accessor: "users",
    paginationKeys: { offset: "skip", limit: "limit" },
  },
  schema: postsSchema,
  rowActions: postsRowActions,
  actionColumn: { enable: true, pin: PinDirection.right, size: ItemSize.sm },
  indexRow: { enable: true, size: ItemSize.sm },
};
