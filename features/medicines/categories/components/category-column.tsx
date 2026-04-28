"use client";

import { NumberCellColumn } from "@/components/common/number-cell-column";
import { Category } from "@/lib/api/types/category";
import { formatDate } from "@/lib/date";
import { ColumnDef } from "@tanstack/react-table";
import { CategoryCellAction } from "./category-cell-action";

export const categoryColumn: ColumnDef<Category>[] = [
  {
    header: "No",
    cell: ({ row }) => {
      return <NumberCellColumn index={row.index} />;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "Created Date",
    cell: ({ row }) => {
      return formatDate(row.original.createdAt);
    },
  },
  {
    header: "Action",
    cell: ({ row }) => {
      return <CategoryCellAction data={row.original} />;
    },
  },
];
