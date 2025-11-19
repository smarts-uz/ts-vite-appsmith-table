import "../tailwind.css";
import type { Meta, StoryObj } from "@storybook/react";
import InfiniteTable from "../widgets/InfiniteTable/InfiniteTable";
import { ClientSideProps } from "./ClientSide";
import { StyledTableProps } from "./StyledTable";

// Storybook meta
const meta: Meta<typeof InfiniteTable> = {
  title: "Infinite Table",
  component: InfiniteTable,
  tags: ["autodocs"],
  parameters: { deepControls: { enabled: false } },
  argTypes: {
    triggerEvent: { action: "triggerEvent" },
    updateModel: { action: "updateModel" },
  },
};

export default meta;
type Story = StoryObj<typeof InfiniteTable>;

// Full story
export const ClientSide: Story = {
  args: {
    ...ClientSideProps,
  },
  render: (args) => <InfiniteTable {...args} />,
};

// Full story
export const ColoredTable: Story = {
  args: {
    ...StyledTableProps,
  },
  render: (args) => <InfiniteTable {...args} />,
};
