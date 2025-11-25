import React from "react";
import { InView } from "react-intersection-observer";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  type ColumnPinningState,
} from "@tanstack/react-table";
import TanstackTableBody from "@/components/tanstack-table/body";
import TanstackTableHead from "@/components/tanstack-table/head";
import { createColumns } from "./createColumns";
import type { TableModel } from "./types";
import { PinDirection } from "./constants";
import { validateTableModel } from "./validator/validateTableModal";
import { Table } from "@/components/ui/table";
import { InfoCard } from "./components/info-card";
import { cn } from "@/lib/utils";
import { PER_PAGE } from "./constants";
import { Loader } from "lucide-react";

function ClientTable(props: TableModel) {
  const {
    schema,
    rowActions,
    rowSelectionAction,
    actionColumn,
    indexRow,
    tableData,
    max_count,
    styles,
    limit = PER_PAGE,
    updateModel = () => {},
    triggerEvent = () => {},
    onModelChange = () => {},
  } = props;

  const validation = validateTableModel(props);
  const [rowSelection, setRowSelection] = React.useState({});
  const [rowPinning, setRowPinning] = React.useState({});
  const [page, setPage] = React.useState(0);
  const [hasMore, setHasMore] = React.useState(true);
  const [data, setData] = React.useState(tableData || []);

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

  const [columnPinning, setColumnPinning] = React.useState<ColumnPinningState>(
    getInitialPinning()
  );

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

  const handleLoadMore = (
    inView: boolean,
    entry: IntersectionObserverEntry
  ) => {
    if (
      !inView ||
      !hasMore ||
      !entry.isIntersecting ||
      data?.length < page * limit
    )
      return;
    const next = page + 1;
    setPage(next);
    triggerEvent("onLoadMore", { page: next, limit });
  };

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

  React.useEffect(() => {
    if (page * limit > max_count) {
      setHasMore(false);
    }
  }, [page, limit, max_count]);

  React.useEffect(() => {
    if (data?.length > 0) {
      onModelChange((model: { data: Array<any> }) => {
        if (model?.data?.length > 0 && model.data !== data) {
          setData(model.data || []);
        }
      });
    }
  }, [data]);

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
        "max-h-svh lg:max-h-[40rem] border-border xl:max-h-[48rem] relative flex flex-col gap-2 overflow-y-auto font-sans",
        styles?.container
      )}
      style={{ ...styles?.variables }}
    >
      <Table
        className={cn(
          "w-full min-w-96 h-full table-auto border-collapse",
          styles?.table
        )}
      >
        <TanstackTableHead styles={styles?.head} table={table} />
        <TanstackTableBody styles={styles?.body} table={table} />
      </Table>
      {hasMore && (
        <InView
          triggerOnce={false}
          as="div"
          threshold={0}
          rootMargin="200px 0px"
          onChange={(inView, entry) => handleLoadMore(inView, entry)}
          colSpan={table.getVisibleLeafColumns().length}
          className="h-10 text-muted-foreground flex justify-center items-center"
        >
          <Loader className="animate-spin" />
        </InView>
      )}
    </main>
  );
}

export default ClientTable;
