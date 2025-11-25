import "../tailwind.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import ClientTable from "../ClientTable";
import { ClientSideProps } from "./ClientSide";
import { StyledTableProps } from "./StyledTable";
import { useState, useEffect } from "react";
import { generateData } from "./helper";

// Storybook meta
const meta: Meta<typeof ClientTable> = {
  title: "Appsmith Table",
  component: ClientTable,
  tags: ["autodocs"],
  parameters: { deepControls: { enabled: false } },
  argTypes: {
    triggerEvent: { action: "triggerEvent" },
    updateModel: { action: "updateModel" },
    onModelChange: { action: "onModelChange" },
  },
};

export default meta;
type Story = StoryObj<typeof ClientTable>;

// Full story
export const Default: Story = {
  args: {
    ...ClientSideProps,
  },
  render: function Render(args) {
    const [data, setData] = useState(args.tableData);

    useEffect(() => {
      setData(args.tableData);
    }, [args.tableData]);

    const onTriggerEvent = (event: string, payload: any) => {
      if (event === "onLoadMore") {
        const newData = generateData(payload.limit || 10);
        setData((prev) => [...(prev || []), ...newData]);
      }
      args.triggerEvent?.(event, payload);
    };

    return (
      <ClientTable {...args} tableData={data} triggerEvent={onTriggerEvent} />
    );
  },
};

// Full story
export const ColoredTable: Story = {
  args: {
    ...StyledTableProps,
  },
  render: (args) => <ClientTable {...args} />,
};
