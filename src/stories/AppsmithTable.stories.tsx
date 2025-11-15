// stories/AppsmithTable.stories.tsx
import "../tailwind.css";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import AppsmithTable from "../widgets/AppsmithTable/AppsmithTable";
import type {
  TableModel,
  RowAction,
  Schema,
} from "../widgets/AppsmithTable/types";
import {
  PinDirection,
  ItemSize,
  ColumnType,
} from "../widgets/AppsmithTable/constants";
import * as LucideIcons from "lucide-react";

// Typed row actions
const defaultRowActions: RowAction[] = [
  { title: "Korish", onClick: "onClick", icon: "Activity" },
  { title: "Qoshish", onClick: "onKomol", icon: "AlarmClockPlus" },
  { title: "Tolov", onClick: "onClick" },
];

// Typed schema with autocomplete
const defaultSchema: Schema = {
  userId: {
    type: ColumnType.NUMBER,
    title: "User ID",
    sort: true,
    filter: true,
    size: ItemSize.sm,
  },
  id: {
    type: ColumnType.ID,
    title: "Post ID",
    sort: true,
    filter: true,
    size: ItemSize.sm,
  },
  title: {
    type: ColumnType.TEXT,
    title: "Title",
    sort: true,
    filter: true,
    size: ItemSize.sm,
  },
  body: {
    type: ColumnType.TEXT,
    title: "Body",
    sort: false,
    filter: true,
    size: ItemSize.sm,
  },
};

// Default table model
const defaultModel: TableModel = {
  fetcher: { url: "https://jsonplaceholder.typicode.com/posts" },
  schema: defaultSchema,
  rowActions: defaultRowActions,
  actionColumn: { enable: true, pin: PinDirection.right, size: ItemSize.sm },
  indexRow: { enable: true },
};

// Storybook meta with typed args
const meta: Meta<typeof AppsmithTable> = {
  title: "Components/AppsmithTable",
  component: AppsmithTable,
  tags: ["autodocs"],
  argTypes: {
    // Row actions array: dynamic object
    model: {
      description: "Full table model with typed schema and row actions",
      control: "object", // whole model editable as object
    },

    // Schema columns: type, size, etc. as select dropdowns
    argTypes: {
      "model.actionColumn.pin": {
        control: { type: "select", options: Object.values(PinDirection) },
      },
      "model.actionColumn.size": {
        control: { type: "select", options: Object.values(ItemSize) },
      },
      "model.rowActions.*.icon": {
        control: { type: "select", options: Object.keys(LucideIcons) },
      },
    },
    // Other actions
    triggerEvent: { action: "triggerEvent" },
    updateModel: { action: "updateModel" },
  } ,
};

export default meta;
type Story = StoryObj<typeof AppsmithTable>;

// Story with full typing
export const AllOptions: Story = {
  args: {
    model: defaultModel,
    triggerEvent: fn(),
    updateModel: fn(),
  },
  render: (args) => <AppsmithTable {...args} />,
};
