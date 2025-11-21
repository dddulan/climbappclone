import * as React from "react";
import { cn } from "@/lib/utils";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { Button } from "./button";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends unknown> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
    onDeselect: (rowIndex: number, isSave: boolean) => void;
    // onCreate: () => void;
    onDelete: () => void;
    isEdit: boolean;
  }
}

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm bg-transparent", className)}
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead data-slot="table-header" className={cn(className)} {...props} />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return <tbody data-slot="table-body" className={cn(className)} {...props} />;
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot data-slot="table-footer" className={cn(className)} {...props} />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return <tr data-slot="table-row" className={cn(className)} {...props} />;
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-foreground h-10 px-2 text-left align-middle font-bold whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "px-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  );
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  );
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isEdit?: boolean;
  isRouteSelected?: boolean;
  editId?: number;
  emptyMessage?: string;
  onRowClick?: (row: TData, isSelected: boolean) => void;
  onUpdate?: (rowIndex: number, columnId: string, value: unknown) => void;
  onDeselect?: (rowIndex: number, isSave: boolean) => void;
  onDelete?: () => void;
  showPagination?: boolean;
}

function DataTable<TData, TValue>({
  columns,
  data,
  onUpdate,
  onDeselect,
  onDelete,
  onRowClick,
  emptyMessage = "No data available.",
  isRouteSelected = false,
  isEdit = false,
  showPagination = true,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection: true,
    enableMultiRowSelection: false,
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 20,
      },
    },
    autoResetPageIndex: false,
    meta: {
      updateData: (rowIndex: number, columnId: string, value: unknown) => {
        onUpdate?.(rowIndex, columnId, value);
      },
      onDeselect: (rowIndex: number, isSave: boolean) => {
        onDeselect?.(rowIndex, isSave);
      },
      onDelete: () => {
        onDelete?.();
      },
      isEdit,
    },
  });

  //when a new row is added to the table, jump to the last page
  React.useEffect(() => {
    table.setPageIndex(table.getPageCount() - 1);
  }, [data.length]);

  return (
    <div>
      <div className="flex rounded-md overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => {
                    if (!isRouteSelected) {
                      if (table.getIsSomeRowsSelected()) {
                        // another row is selected
                        row.toggleSelected();
                        table.options.meta?.onDeselect(
                          table.getSelectedRowModel().rows[0].index,
                          false
                        );
                      } else {
                        // another row is not selected
                        row.toggleSelected();
                      }

                      onRowClick?.(row.original, table.getIsSomeRowsSelected());
                    }
                  }}
                  className="cursor-pointer data-[state=selected]:bg-muted"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="py-2"
                      onClick={(e) => {
                        row.getIsSelected() ? e.stopPropagation() : null;
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {showPagination ? (
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>

          <span className="border-1 w-7 text-center rounded-sm">
            {table.getState().pagination.pageIndex + 1}
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export {
  DataTable,
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
