import "../tailwind.css";
import type { RowAction, TableModel } from "../types";
import { PinDirection } from "../constants";
import { generateData, mockSchema } from "./helper";

const postsRowActions: RowAction[] = [
  { title: "Korish", onClick: "onClick", icon: "Activity" },
  { title: "Qoshish", onClick: "onKomol", icon: "AlarmClockPlus" },
  { title: "Tolov", onClick: "onClick" },
];

export const ClientSideProps: TableModel = {
  tableData: generateData(20),
  limit: 20,
  max_count: 400,
  schema: mockSchema,
  rowActions: postsRowActions,
  actionColumn: { enable: true, pin: PinDirection.right, type: "outline" },
  indexColumn: { enable: true },
  triggerEvent: (event: string, data: any) => {
    if (event === "onLoadMore") {
      console.log(data);
      console.log("triggerEvent");
    }
  },
};
