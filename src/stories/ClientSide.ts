import "../tailwind.css";
import type {
  RowAction,
  Schema,
  TableModel,
} from "../widgets/ClientTable/types";
import { ItemSize } from "../widgets/ClientTable/constants";
import { PinDirection } from "../widgets/ClientTable/constants";
import data from "./data-1.json";

const postsSchema: Schema = {
  id: {
    title: "ID",
    sort: true,
  },
  name: {
    title: "Name",
    sort: true,
    size: ItemSize.md,
  },
  email: {
    title: "Email",
    sort: true,
    size: ItemSize.md,
  },
  phone: {
    title: "Phone",
    sort: true,
    size: ItemSize.lg,
  },
  agent: {
    title: "Agent",
    sort: true,
    size: ItemSize.lg,
  },
};

const postsRowActions: RowAction[] = [
  { title: "Korish", onClick: "onClick", icon: "Activity" },
  { title: "Qoshish", onClick: "onKomol", icon: "AlarmClockPlus" },
  { title: "Tolov", onClick: "onClick" },
];

export const ClientSideProps: TableModel = {
  data,
  schema: postsSchema,
  rowActions: postsRowActions,
  actionColumn: { enable: true, pin: PinDirection.right, size: ItemSize.sm },
  indexRow: { enable: true, size: ItemSize.sm },
};
