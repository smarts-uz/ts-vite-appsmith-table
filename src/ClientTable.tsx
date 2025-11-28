import React from "react";
import { InView } from "react-intersection-observer";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import TanstackTableBody from "@/components/tanstack-table/body";
import TanstackTableHead from "@/components/tanstack-table/head";
import { createColumns } from "./createColumns";
import type { TableModel } from "./types";
import { PinDirection } from "./constants";
import { validateTableModel } from "./lib/validateTableModal";
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
    indexColumn,
    tableData,
    max_count = PER_PAGE,
    styles,
    limit = PER_PAGE,
    conditionalRowStyles,
    locale,
    updateModel = () => {},
    triggerEvent = () => {},
    onModelChange = () => {},
  } = props;

  const validation = validateTableModel(props);
  const [page, setPage] = React.useState(0);
  const [hasMore, setHasMore] = React.useState(true);
  const [data, setData] = React.useState(tableData || []);

  const getInitialPinning = React.useCallback(() => {
    const left: string[] = [];
    const right: string[] = [];

    if (indexColumn?.enable && indexColumn?.pin) {
      if (indexColumn?.pin === PinDirection.left) left.push("index");
      else if (indexColumn?.pin === PinDirection.right) right.push("index");
    }

    if (
      actionColumn?.enable &&
      actionColumn?.pin &&
      rowActions &&
      rowActions?.length > 0
    ) {
      if (actionColumn?.pin === PinDirection.left) left.push("actions");
      else if (actionColumn?.pin === PinDirection.right) right.push("actions");
    }
    return { left, right };
  }, [indexColumn, actionColumn, rowActions]);

  const columns = createColumns({
    schema,
    rowActions,
    indexColumn,
    actionColumn,
    triggerEvent,
    locale,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: {
      columnPinning: getInitialPinning(),
    },
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
    if (page * limit >= max_count) {
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
        "max-h-[40rem] md:max-h-[48rem] lg:max-h-[56rem] flex flex-col gap-2 overflow-auto font-sans relative ",
        hasMore && "pb-2",
        styles?.container
      )}
      style={{ ...styles?.variables }}
    >
      <Table
        className={cn(
          "w-full min-w-80 h-full table-auto border-collapse",
          styles?.table
        )}
      >
        <TanstackTableHead styles={styles?.head} table={table} />
        <TanstackTableBody
          rowSelectionAction={rowSelectionAction}
          updateModel={updateModel}
          triggerEvent={triggerEvent}
          styles={styles?.body}
          table={table}
          conditionalRowStyles={conditionalRowStyles}
        />
      </Table>
      {hasMore && (
        <InView
          triggerOnce={false}
          as="div"
          threshold={0}
          rootMargin="200px 0px"
          onChange={(inView, entry) => handleLoadMore(inView, entry)}
          className="h-10 text-muted-foreground relative flex justify-center items-center"
        >
          <Loader className="animate-spin " />
        </InView>
      )}
    </main>
  );
}

export default ClientTable;
