"use client";

import { NumberCellColumn } from "@/components/common/number-cell-column";
import { Brand } from "@/lib/api/types/brand";
import { formatDate } from "@/lib/date";
import { ColumnDef } from "@tanstack/react-table";
import { BrandCellAction } from "./brand-cell-action";

export const brandColumn: ColumnDef<Brand>[] = [
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
      return <BrandCellAction data={row.original} />;
    },
  },
];
