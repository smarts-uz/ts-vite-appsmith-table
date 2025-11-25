import "../tailwind.css";
import type {
  RowAction,
  Schema,
  TableModel,
} from "../widgets/ClientTable/types";
import { ItemSize } from "../widgets/ClientTable/constants";
import { PinDirection } from "../widgets/ClientTable/constants";
import { faker } from "@faker-js/faker";

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
  orders: {
    title: "Orders",
    sort: true,
    size: ItemSize.lg,
  },
  description: {
    title: "Description",
  },
};

const postsRowActions: RowAction[] = [
  { title: "Korish", onClick: "onClick", icon: "Activity" },
  { title: "Qoshish", onClick: "onKomol", icon: "AlarmClockPlus" },
  { title: "Tolov", onClick: "onClick" },
];

export const generateData = (count: number) => {
  return Array.from({ length: count }).map(() => ({
    id: faker.number.int(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    orders: faker.number.int(),
    description: faker.lorem.sentence(),
  }));
};

export const ClientSideProps: TableModel = {
  tableData: generateData(20),
  limit: 20,
  max_count: 400,
  schema: postsSchema,
  rowActions: postsRowActions,
  actionColumn: { enable: true, pin: PinDirection.right, size: ItemSize.sm },
  indexRow: { enable: true, size: ItemSize.sm },
  triggerEvent: (event: string, data: any) => {
    if (event === "onLoadMore") {
      console.log(data);
      console.log("triggerEvent");
    }
  },
};
