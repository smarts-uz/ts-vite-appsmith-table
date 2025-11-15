import "../tailwind.css";
import type { Meta, StoryObj } from "@storybook/react";
import type { TypeWithDeepControls } from "storybook-addon-deep-controls";
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
import { fn } from "@storybook/test";

// Typed row actions
const defaultRowActions: RowAction[] = [
  { title: "Korish", onClick: "onClick", icon: "Activity" },
  { title: "Qoshish", onClick: "onKomol", icon: "AlarmClockPlus" },
  { title: "Tolov", onClick: "onClick" },
];

// Typed schema
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

// Default model
const defaultModel: TableModel = {
  fetcher: { url: "https://jsonplaceholder.typicode.com/posts" },
  schema: defaultSchema,
  rowActions: defaultRowActions,
  actionColumn: { enable: true, pin: PinDirection.right, size: ItemSize.sm },
  indexRow: { enable: true },
};

// Storybook meta with deep controls and enum selections
const meta: TypeWithDeepControls<Meta<typeof AppsmithTable>> = {
  title: "Components/AppsmithTable",
  component: AppsmithTable,
  tags: ["autodocs"],
  parameters: {
    deepControls: { enabled: true },
  },
  argTypes: {
    // model object editable as object
    model: {
      control: "object",
      description: "Full table model with typed schema and row actions",
    },
    // Top-level enum controls
    "model.actionColumn.pin": {
      control: "select",
      options: Object.values(PinDirection),
    },
    "model.actionColumn.size": {
      control: "select",
      options: Object.values(ItemSize),
    },
    // RowAction icons: only first 3 actions for simplicity
    "model.rowActions.0.icon": {
      control: "select",
      options: Object.keys(LucideIcons),
    },
    "model.rowActions.1.icon": {
      control: "select",
      options: Object.keys(LucideIcons),
    },
    "model.rowActions.2.icon": {
      control: "select",
      options: Object.keys(LucideIcons),
    },
    triggerEvent: { action: "triggerEvent" },
    updateModel: { action: "updateModel" },
  },
};

export default meta;
type Story = TypeWithDeepControls<StoryObj<typeof AppsmithTable>>;

// Full-typed story
export const AllOptions: Story = {
  args: {
    model: defaultModel,
    triggerEvent: fn(),
    updateModel: fn(),
  },
  render: (args) => <AppsmithTable {...args} />,
};
