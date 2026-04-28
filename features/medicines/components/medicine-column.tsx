"use client";

import { NumberCellColumn } from "@/components/common/number-cell-column";
import { Medicine } from "@/lib/api/types/medicine";
import { formatDate } from "@/lib/date";
import { ColumnDef } from "@tanstack/react-table";
import { MedicineCellAction } from "./medicine-cell-action";

export const medicineColumns: ColumnDef<Medicine>[] = [
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
    accessorKey: "strength",
    header: "Strength",
  },
  {
    accessorKey: "brand",
    header: "Brand",
    cell: ({ row }) => {
      return row.original.brand?.name || "-";
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      return row.original.category?.name || "-";
    },
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
      return <MedicineCellAction data={row.original} />;
    },
  },
];
