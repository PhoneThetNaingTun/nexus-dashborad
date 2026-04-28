"use client";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePaginationSearchParams } from "@/lib/nuqs/searchParams";

interface DataTablePaginationProps<TData> {
  totalPages: number;
}

export function DataTablePagination<TData>({
  totalPages,
}: DataTablePaginationProps<TData>) {
  const [{ pageIndex, pageSize }, setPagination] = usePaginationSearchParams();

  return (
    <div className="flex items-center justify-between px-2">
      {/* Rows per page */}
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium">Items per page</p>
        <Select
          value={String(pageSize)}
          onValueChange={(value) =>
            setPagination((old) => ({
              ...old,
              pageSize: Number(value),
              pageIndex: 0,
            }))
          }
        >
          <SelectTrigger className="h-8 w-17.5">
            <SelectValue />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 25, 30, 40, 50].map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex w-25 items-center justify-center text-sm font-medium">
          Page {pageIndex + 1} of {totalPages}
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() => setPagination((old) => ({ ...old, pageIndex: 0 }))}
            disabled={pageIndex === 0}
          >
            <ChevronsLeft />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() =>
              setPagination((old) => ({
                ...old,
                pageIndex: Math.max(old.pageIndex - 1, 0),
              }))
            }
            disabled={pageIndex === 0}
          >
            <ChevronLeft />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="size-8"
            onClick={() =>
              setPagination((old) => ({
                ...old,
                pageIndex: Math.min(old.pageIndex + 1, totalPages - 1),
              }))
            }
            disabled={pageIndex >= totalPages - 1}
          >
            <ChevronRight />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="hidden size-8 lg:flex"
            onClick={() =>
              setPagination((old) => ({
                ...old,
                pageIndex: totalPages - 1,
              }))
            }
            disabled={pageIndex >= totalPages - 1}
          >
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
