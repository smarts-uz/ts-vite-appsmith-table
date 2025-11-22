import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import TanstackTableBody from "@/components/tanstack-table/body";
import TanstackTableHead from "@/components/tanstack-table/head";
import { createColumns } from "./createColumns";
import { getT } from "./lib/getT";
import { defaultTranslations } from "./lib/translations";
import type { TableModel } from "./types";
import { PinDirection } from "./constants";
import { validateTableModel } from "./validator/validateTableModal";
import { Table } from "@/components/ui/table";
import { InfoCard } from "./components/info-card";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PER_PAGE } from "./constants";

function ClientTable(props: TableModel) {
  const {
    schema,
    rowActions,
    rowSelectionAction,
    actionColumn,
    indexRow,
    translations,
    data,
    styles,
    limit = PER_PAGE,
    updateModel = () => {},
    triggerEvent = () => {},
  } = props;
  const validation = validateTableModel(props);
  const [page, setPage] = useState(0);
  const [rowSelection, setRowSelection] = React.useState({});
  const [rowPinning, setRowPinning] = React.useState({});

  const t = React.useCallback(getT(translations, defaultTranslations), [
    translations,
  ]);
  const [sorting] = React.useState([]);

  const getInitialPinning = React.useCallback(() => {
    const left: string[] = [];
    const right: string[] = [];

    if (indexRow?.enable) {
      if (indexRow?.pin === PinDirection.left) left.push("#");
      else if (indexRow?.pin === PinDirection.right) right.push("#");
    }

    if (actionColumn?.enable && rowActions && rowActions?.length > 0) {
      if (actionColumn?.pin === PinDirection.left) left.push("actions");
      else if (actionColumn?.pin === PinDirection.right) right.push("actions");
    }

    return { left, right };
  }, [indexRow, actionColumn, rowActions]);

  const [columnPinning, setColumnPinning] = React.useState(getInitialPinning());

  React.useEffect(() => {
    setColumnPinning(getInitialPinning());
  }, [getInitialPinning]);

  const columns = createColumns({
    schema,
    rowActions,
    indexRow,
    actionColumn,
    triggerEvent,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    onRowPinningChange: setRowPinning,
    state: {
      sorting,
      rowSelection,
      columnPinning,
      rowPinning,
    },
    enableRowSelection: true,
    manualSorting: true,
  });

  React.useEffect(() => {
    const selectedRowId = Object.keys(rowSelection)[0];

    if (!selectedRowId) {
      updateModel({ selectedRow: {} });
      return;
    }

    const selectedRow = table.getRow(selectedRowId);

    if (selectedRow) {
      updateModel({ selectedRow: selectedRow.original });
      if (rowSelectionAction) {
        triggerEvent(rowSelectionAction, {
          row: selectedRow.original,
        });
      }
    }
  }, [rowSelection, rowSelectionAction, table]);

  const handleClick = () => {
    setPage((prev) => prev + 1);
    triggerEvent("onLoadMore", { page, limit });
  };

  // const handleSort = (sortCol: string, sortOption = "ASC") => {
  //   setSorting('asd')
  //   setPage(1);
  //   triggerEvent("onSort", { sortCol, sortOption, limit });
  // };

  if (data?.length === 0) {
    return <InfoCard message={t("noData")} variant="info" />;
  }

  if (!validation.success) {
    return (
      <InfoCard
        message={
          typeof validation.error === "string"
            ? validation.error
            : "Table configuration is invalid. Check the errors above."
        }
        variant="error"
      />
    );
  }

  return (
    <main
      className={cn(
        "max-h-svh lg:max-h-[40rem] xl:max-h-[48rem] overflow-y-scroll gap-4 lg:gap-6",
        styles?.container
      )}
      style={{ ...styles?.variables }}
    >
      <Table
        className={cn(
          "w-full min-w-96 table-auto border-collapse",
          styles?.table
        )}
      >
        <TanstackTableHead styles={styles?.head} table={table} />
        <TanstackTableBody styles={styles?.body} table={table} />
      </Table>

      <Button onClick={handleClick} className="mt-2">
        Load More
      </Button>
    </main>
  );
}

export default ClientTable;
