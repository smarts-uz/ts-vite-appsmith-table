import "../tailwind.css";
import type { Meta, StoryObj } from "@storybook/react";
import ClientTable from "../widgets/ClientTable/ClientTable";
import { ClientSideProps } from "./ClientSide";
import { StyledTableProps } from "./StyledTable";

// Storybook meta
const meta: Meta<typeof ClientTable> = {
  title: "Infinite Table",
  component: ClientTable,
  tags: ["autodocs"],
  parameters: { deepControls: { enabled: false } },
  argTypes: {
    triggerEvent: { action: "triggerEvent" },
    updateModel: { action: "updateModel" },
  },
};

export default meta;
type Story = StoryObj<typeof ClientTable>;

// Full story
export const ClientSide: Story = {
  args: {
    ...ClientSideProps,
  },
  render: (args) => <ClientTable {...args} />,
};

// Full story
export const ColoredTable: Story = {
  args: {
    ...StyledTableProps,
  },
  render: (args) => <ClientTable {...args} />,
};
