import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import TanstackTableBody from "@/components/tanstack-table/body";
import TanstackTableHead from "@/components/tanstack-table/head";
import { createColumns } from "./createColumns";
import { TableFilters } from "./components/filters";
import { getT } from "./lib/getT";
import {
  QueryClient,
  useInfiniteQuery,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { fetcherFN } from "./lib/fetcherFN";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { defaultTranslations } from "./lib/translations";
import type { TableModel } from "./types";
import { PAGE_PARAM, PER_PAGE, PinDirection } from "./constants";
import { validateTableModel } from "./validator/validateTableModal";
import { Table } from "@/components/ui/table";
import { InfoCard } from "./components/info-card";
import { SkeletonTable } from "./components/skeleton-table";
import { cn } from "@/lib/utils";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      retry: 3,
      refetchInterval: 1000 * 60,
    },
  },
});

function CustomTable({
  schema,
  rowActions,
  rowSelectionAction,
  actionColumn,
  indexRow,
  translations,
  fetcher,
  styles,
  updateModel = () => {},
  triggerEvent = () => {},
}: TableModel) {
  const {
    url,
    method,
    headers,
    body,
    accessor,
    perPage = PER_PAGE,
    pageParam = PAGE_PARAM,
    paginationKeys,
  } = fetcher;

  const {
    data: infiniteData,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: [url],
    initialPageParam: pageParam ?? 0,
    queryFn: ({ pageParam }: { pageParam: number }) =>
      fetcherFN({
        url,
        method,
        headers,
        body,
        accessor,
        cb: (value) => updateModel({ data: value }),
        paginationKeys,
        perPage,
        pageParam,
      }),
    getNextPageParam: (lastPage: any, allPages: any) => {
      if (lastPage.length < perPage) return undefined;
      return (allPages.length ?? 0) * perPage;
    },
  });

  const data = infiniteData?.pages.flat() ?? [];
  const [rowSelection, setRowSelection] = React.useState({});
  const [rowPinning, setRowPinning] = React.useState({});
  const [columnFilters] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const t = React.useCallback(getT(translations, defaultTranslations), [
    translations,
  ]);
  const [sorting] = React.useState([]);

  const getInitialPinning = React.useCallback(() => {
    const left: string[] = [];
    const right: string[] = [];

    if (indexRow?.enable) {
      left.push("#");
    }

    if (actionColumn?.enable && rowActions && rowActions?.length > 0) {
      if (actionColumn.pin === PinDirection.left) left.push("actions");
      else if (actionColumn.pin === PinDirection.right) right.push("actions");
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
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    onRowPinningChange: setRowPinning,
    state: {
      sorting,
      rowSelection,
      columnPinning,
      columnFilters,
      globalFilter,
      rowPinning,
    },
    enableRowSelection: true,
    manualSorting: true,
    manualFiltering: true,
    enableMultiRowSelection: false,
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

  if (isLoading) {
    return <SkeletonTable />;
  }

  if (data?.length === 0) {
    return <InfoCard message={t("noData")} variant="info" />;
  }

  if (isError) {
    return <InfoCard message={error.message} variant="error" />;
  }

  return (
    <Card
      className={cn(
        "max-h-svh lg:max-h-[40rem] xl:max-h-[48rem] overflow-y-scroll gap-4 lg:gap-6",
        styles?.card?.container
      )}
      style={{ ...styles?.variables }}
    >
      <CardHeader
        className={cn(
          "px-2 lg:px-6 flex flex-wrap items-center gap-2",
          styles?.card?.header
        )}
      >
        {table
          .getHeaderGroups()
          .map((headerGroup) =>
            headerGroup.headers.map((header) =>
              !header.isPlaceholder && header.column.getCanFilter() ? (
                <TableFilters key={header.id} column={header.column} t={t} />
              ) : null
            )
          )}
      </CardHeader>
      <CardContent className={cn("px-2 lg:px-6 ", styles?.card?.content)}>
        <Table
          className={cn(
            "w-full min-w-96 table-auto border-collapse",
            styles?.table
          )}
        >
          <TanstackTableHead styles={styles?.head} table={table} />
          <TanstackTableBody styles={styles?.body} table={table} />
        </Table>
        {hasNextPage && (
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="px-4 py-2 mt-2 bg-blue-600 max-w-64 block justify-center mx-auto text-white rounded-lg shadow-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isFetchingNextPage ? "Loading more..." : "Load More"}
          </button>
        )}
      </CardContent>
    </Card>
  );
}

function InfiniteTable(props: TableModel) {
  const validation = validateTableModel(props);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {validation.success ? (
        <CustomTable {...props} />
      ) : (
        <InfoCard
          message={
            typeof validation.error === "string"
              ? validation.error
              : "Table configuration is invalid. Check the errors above."
          }
          variant="error"
        />
      )}
    </QueryClientProvider>
  );
}

export default InfiniteTable;
