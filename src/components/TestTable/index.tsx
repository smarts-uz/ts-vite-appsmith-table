import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { THead } from "../TanstackTable/head";
import TBody from "../TanstackTable/body";
import { createColumns } from "./columns";
import { TableFilters } from "./Filters";
import { getT } from "./lib/getT";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Toaster } from "sonner";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { fetcherFN } from "./lib/fetcherFN";
interface TableProps {
  model?: any;
  updateModel?: any;
  triggerEvent?: any;
}

const fallbackModel = {
  pagination: {},
  schema: {},
  rowActions: {},
  rowSelectionAction: "",
  actionColumn: {},
  rowIndexColumn: {},
  colors: {},
  showBorder: true,
  rowStyleRules: [],
  translations: {},
  fetcher: {},
};

// ---- TanStack Query client ----
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      retry: 3,
      refetchInterval: 1000 * 60,
    },
  },
});

const fetchPosts = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) throw new Error("Network error");
  return res.json();
};

function Table({
  model = fallbackModel,
  updateModel = () => {},
  triggerEvent = () => {},
}: TableProps) {
  const {
    pagination: paginationProps = {},
    schema = {},
    rowActions = [],
    rowSelectionAction = "",
    actionColumn = {},
    rowIndexColumn = {},
    translations = {},
    fetcher = {},
  } = model;
  // const { url, method, headers, body, accessor } = fetcher;
  const { enable: enablePagination = false, pageSize = 20 } = paginationProps;
  const { pin: actionPin } = actionColumn;

  const { data = [], isLoading } = useQuery({
    queryKey: ["data"],
    queryFn: fetchPosts,
  });

  const [rowSelection, setRowSelection] = React.useState({});
  const [rowPinning, setRowPinning] = React.useState({});
  // const [columnFilters, setColumnFilters] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const t = React.useCallback(getT(translations, defaultTranslations), [
    translations,
  ]);
  // const [sorting, setSorting] = React.useState([]);
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: pageSize,
  });

  // const getInitialPinning = React.useCallback(() => {
  //   const left = [];
  //   const right = [];

  //   if (schema && typeof schema === "object") {
  //     for (const colKey in schema) {
  //       if (Object.prototype.hasOwnProperty.call(schema, colKey)) {
  //         const colSchema = schema[colKey];
  //         if (colSchema && colSchema.pin === "left") {
  //           left.push(colKey);
  //         } else if (colSchema && colSchema.pin === "right") {
  //           right.push(colKey);
  //         }
  //       }
  //     }
  //   }
  //   if (rowActions.length > 0) {
  //     if (actionPin === "left") {
  //       left.push("actions");
  //     } else if (actionPin === "right") {
  //       right.push("actions");
  //     }
  //   }
  //   return { left, right };
  // }, [schema, rowActions, actionPin]);

  // const [columnPinning, setColumnPinning] = React.useState(getInitialPinning());

  // React.useEffect(() => {
  //   setColumnPinning(getInitialPinning());
  // }, [getInitialPinning]);

  // React.useEffect(() => {
  //   updateModel({ data });
  // }, [data]);

  const columns = createColumns({
    data,
    schema,
    rowActions,
    rowIndexColumn,
    enablePagination,
    actionPin,
    t,
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
      // sorting,
      rowSelection,
      // columnPinning,
      // columnFilters,
      globalFilter,
      rowPinning,
      ...(enablePagination ? { pagination } : {}),
    },
    enableRowSelection: true,
    enableMultiRowSelection: false,
    ...(enablePagination
      ? {
          getPaginationRowModel: getPaginationRowModel(),
          onPaginationChange: setPagination,
        }
      : {}),
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
    return <>Loading...</>;
  }

  if (data?.length === 0) {
    return <div className="text-center p-8 text-lg">{t("noData")}</div>;
  }

  return (
    <main className="font-sans flex flex-col h-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {table
          .getHeaderGroups()
          .map((headerGroup) =>
            headerGroup.headers.map((header) =>
              !header.isPlaceholder && header.column.getCanFilter() ? (
                <TableFilters key={header.id} column={header.column} t={t} />
              ) : null
            )
          )}
      </div>

      <table
        className="table table-fixed table-pin-rows table-pin-cols w-full"
        style={{ minWidth: table.getTotalSize() }}
      >
        <THead table={table} />
        <TBody table={table} />
      </table>
    </main>
  );
}
export function MainTable(props: any) {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
      <Table model={props.model} />
    </QueryClientProvider>
  );
}
const defaultTranslations = {
  all: "All",
  min: "Min",
  max: "Max",
  filterPlaceholder: "Filter {headerText}...",
  filterAriaLabel: "Filter by {headerText}",
  true: "True",
  false: "False",
  dateFromAriaLabel: "From {headerText}",
  dateToAriaLabel: "To {headerText}",
  numberMinAriaLabel: "Minimum {headerText}",
  numberMaxAriaLabel: "Maximum {headerText}",
  goToFirstPage: "Go to first page",
  goToPreviousPage: "Go to previous page",
  goToNextPage: "Go to next page",
  goToLastPage: "Go to last page",
  error: "Error:",
  noData: "No data to display",
  pinRow: "Pin row",
  unpinRow: "Unpin row",
  pinToTop: "Pin to top",
  pinToBottom: "Pin to bottom",
};

export default MainTable;
