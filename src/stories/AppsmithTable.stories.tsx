import "../tailwind.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import ClientTable from "../ClientTable";
import { ClientSideProps } from "./Default";
import { StyledTableProps } from "./StyledTable";
import { useState, useEffect } from "react";
import { generateData } from "./helper";
import { ConditionalTableProps } from "./Conditional";

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
  parameters: {
    docs: {
      description: {
        story: ` 
  Appsmith Custom Table
 
  A fully client-side table component that works via CDN and integrates with Appsmith.
  It fetches data dynamically from Appsmith, supports pagination, and can trigger events
  (e.g., load more pages or perform row actions) directly from the client.
 
  Features:
  - Works entirely client-side with React and TanStack Table v8.
  - Supports row actions, index column, and customizable table sections via AppsmithTableStyles.
  - Can trigger Appsmith events for pagination, row updates, or other interactions.
  - Fully themeable with TailwindCSS and CSS variables for consistent styling.
 
  Ideal for embedding in Appsmith pages or using as a standalone table via CDN.`,
      },
    },
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
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates a fully styled table with custom head, body, container, and cell classes using `AppsmithTableStyles` and ability to set global variables.",
      },
    },
  },
  render: (args) => <ClientTable {...args} />,
};

export const ConditionallyStyledTable: Story = {
  args: {
    ...ConditionalTableProps,
  },
  parameters: {
    docs: {
      description: {
        story:
          "This story demonstrates a table with conditional row styling based on `Foydalanilgan kun` thresholds for over 150 blue, 300 red. and if debt_amount is less than total_payment_amount, it will be green otherwise red text.",
      },
    },
  },
  render: (args) => <ClientTable {...args} />,
};
