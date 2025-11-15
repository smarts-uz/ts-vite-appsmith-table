import "../tailwind.css";
import type { Meta, StoryObj } from "@storybook/react";
import AppsmithTable from "../widgets/AppsmithTable/AppsmithTable";
import type { TableModel } from "../widgets/AppsmithTable/types";
import { PinDirection, ItemSize } from "../widgets/AppsmithTable/constants";
import { postsSchema, postsRowActions } from "./client-mock";

const defaultProps: TableModel = {
  fetcher: { url: "https://jsonplaceholder.typicode.com/posts" },
  schema: postsSchema,
  rowActions: postsRowActions,
  actionColumn: { enable: true, pin: PinDirection.right, size: ItemSize.sm },
  indexRow: { enable: true, size: ItemSize.sm },
};

// Storybook meta
const meta: Meta<typeof AppsmithTable> = {
  title: "Client AppsmithTable",
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
export const ClienSide: Story = {
  args: {
    ...defaultProps,
  },
  render: (args) => <AppsmithTable {...args} />,
};
