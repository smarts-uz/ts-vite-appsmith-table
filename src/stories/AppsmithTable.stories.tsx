import "../tailwind.css";
import type { Meta, StoryObj } from "@storybook/react";
import AppsmithTable from "../widgets/AppsmithTable/AppsmithTable";
import type {
  RowAction,
  Schema,
  TableModel,
} from "../widgets/AppsmithTable/types";
import {
  PinDirection,
  ItemSize,
  ColumnType,
} from "../widgets/AppsmithTable/constants";
import { fn } from "@storybook/test";
// Row actions
const defaultRowActions: RowAction[] = [
  { title: "Korish", onClick: "onClick", icon: "Activity" },
  { title: "Qoshish", onClick: "onKomol", icon: "AlarmClockPlus" },
  { title: "Tolov", onClick: "onClick" },
];

// Schema
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

// Flattened model props (everything is root-level now)
const defaultProps: TableModel = {
  fetcher: { url: "https://jsonplaceholder.typicode.com/posts" },
  schema: defaultSchema,
  rowActions: defaultRowActions,
  actionColumn: { enable: true, pin: PinDirection.right, size: ItemSize.sm },
  indexRow: { enable: true, size: ItemSize.sm },
};

// Storybook meta
const meta: Meta<typeof AppsmithTable> = {
  title: "Components/AppsmithTable",
  component: AppsmithTable,
  tags: ["autodocs"],
  parameters: { deepControls: { enabled: false } },
  argTypes: {
    triggerEvent: { action: "triggerEvent" },
    updateModel: { action: "updateModel" },
  },
};

export default meta;
type Story = StoryObj<typeof AppsmithTable>;

// Full story
export const AllOptions: Story = {
  args: {
    ...defaultProps,
    triggerEvent: fn(),
    updateModel: fn(),
  },
  render: (args) => <AppsmithTable {...args} />,
};
