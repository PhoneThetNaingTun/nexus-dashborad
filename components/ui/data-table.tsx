"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ColumnsIcon, SearchIcon } from "lucide-react";
import React from "react";
import { Button } from "./button";
import { DatePicker } from "./date-picker";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./input-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { DataTablePagination } from "./table-pagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  totalPages?: number;
  showSearch?: boolean;
  totalCount?: number;
  search?: string;
  setSearch?: (value: string) => void;
  showCreateButton?: boolean;
  onCreate?: () => void;
  createButtonText?: string;
  // Filter
  showFilter?: boolean;
  filterOptions?: Array<{ label: string; value: string }>;
  filterValue?: string;
  setFilter?: (value: string) => void;
  // Date
  showDateFilter?: boolean;
  dateValue?: string;
  setDateValue?: (value: string) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  totalPages = 1,
  showSearch = false,
  totalCount = 0,
  search,
  setSearch,
  showCreateButton = false,
  onCreate,
  createButtonText = "Create",
  // filter
  showFilter = false,
  filterOptions,
  filterValue,
  setFilter,
  // date
  showDateFilter,
  dateValue,
  setDateValue,
}: DataTableProps<TData, TValue>) {
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    manualPagination: true,
    pageCount: totalPages,
    state: {
      columnVisibility,
      pagination: {
        pageIndex: 0,
        pageSize: 10,
      },
    },
  });

  return (
    <div className="p-4 bg-background rounded-md mt-10">
      <div className="flex justify-between items-center my-3 w-full overflow-scroll no-scrollbar">
        <div className="min-w-sm">
          <p className="text-xl font-semibold">
            Total items: <span className="text-lg">{totalCount}</span>
          </p>
        </div>
        <div className="flex items-center gap-3 flex-1 justify-end">
          {showSearch && (
            <InputGroup className="w-full min-w-xs max-w-sm">
              <InputGroupInput
                placeholder="Search......"
                value={search ?? ""}
                onChange={(e) => setSearch && setSearch(e.target.value)}
              />
              <InputGroupAddon align={"inline-start"}>
                <SearchIcon />
              </InputGroupAddon>
            </InputGroup>
          )}
          {showDateFilter && (
            <DatePicker date={dateValue} onDateChange={setDateValue} />
          )}
          {showFilter && (
            <Select
              defaultValue={filterValue ?? ""}
              onValueChange={(e) => {
                const v = e === "all" ? "" : e;
                setFilter && setFilter(v);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {filterOptions?.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <ColumnsIcon /> Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          {showCreateButton && (
            <Button onClick={onCreate} className="px-5">
              {createButtonText}
            </Button>
          )}
        </div>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader className="bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4">
        <DataTablePagination totalPages={totalPages} />
      </div>
    </div>
  );
}
