import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { THead } from "../TanstackTable/head";
import TBody from "../TanstackTable/body";
import { createColumns } from "./columns";
import { TableFilters } from "./filter";
import { getT } from "./lib/getT";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Toaster } from "sonner";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { fetcherFN } from "./lib/fetcherFN";
import { Card, CardContent, CardHeader } from "../ui/card";
import type { TableModel } from "./table.types";
import { postsTableSchema } from "@/lib/mock";
import { defaultTranslations } from "./lib/translations";
import { HTTP_METHODS } from "./table.types";

interface TableProps {
  model: TableModel;
  updateModel?: (data: any) => void;
  triggerEvent?: (key: string, data: any) => void;
}

const fallbackModel = {
  fetcher: {
    url: "https://jsonplaceholder.typicode.com/users",
    method: HTTP_METHODS.GET,
  },
  schema: postsTableSchema,
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      retry: 3,
      refetchInterval: 1000 * 60,
    },
  },
});

/* 
  TODO: 1. If data does not match schema it should not be rendered. 
*/

function Table({
  model = fallbackModel,
  updateModel = () => {},
  triggerEvent = () => {},
}: TableProps) {
  const {
    schema,
    rowActions,
    rowSelectionAction,
    actionColumn,
    indexRow,
    translations,
    fetcher,
  } = model;
  const { url, method, headers, body, accessor } = fetcher;

  const { data = [], isLoading } = useQuery({
    queryKey: ["data"],
    queryFn: () =>
      fetcherFN({
        url,
        method,
        headers,
        body,
        accessor,
        cb: () => {
          updateModel({ data });
        },
      }),
  });

  const [rowSelection, setRowSelection] = React.useState({});
  const [rowPinning, setRowPinning] = React.useState({});
  const [columnFilters] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const t = React.useCallback(getT(translations, defaultTranslations), [
    translations,
  ]);
  const [sorting] = React.useState([]);

  const getInitialPinning = React.useCallback(() => {
    const left = [];
    const right = [];

    if (schema && typeof schema === "object") {
      for (const colKey in schema) {
        if (Object.prototype.hasOwnProperty.call(schema, colKey)) {
          const colSchema = schema[colKey];
          if (colSchema && colSchema.pin === "left") {
            left.push(colKey);
          } else if (colSchema && colSchema.pin === "right") {
            right.push(colKey);
          }
        }
      }
    }
    if (rowActions?.length > 0) {
      if (actionColumn?.pin === "left") {
        left.push("actions");
      } else if (actionColumn?.pin === "right") {
        right.push("actions");
      }
    }
    return { left, right };
  }, [schema, rowActions]);

  const [columnPinning, setColumnPinning] = React.useState(getInitialPinning());

  React.useEffect(() => {
    setColumnPinning(getInitialPinning());
  }, [getInitialPinning]);

  const columns = createColumns({
    data,
    schema,
    rowActions,
    indexRow,
    actionPin,
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
    return <>Loading...</>;
  }

  if (data?.length === 0) {
    return <div className="text-center p-8 text-lg">{t("noData")}</div>;
  }

  return (
    <Card>
      <CardHeader className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
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
      <CardContent>
        <table
          className="table table-fixed table-pin-rows table-pin-cols w-full"
          style={{ minWidth: table.getTotalSize() }}
        >
          <THead table={table} />
          <TBody table={table} />
        </table>
      </CardContent>
    </Card>
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

export default MainTable;
