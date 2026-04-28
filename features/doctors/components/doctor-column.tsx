"use client";

import { NumberCellColumn } from "@/components/common/number-cell-column";
import { Doctor } from "@/lib/api/types/doctor";
import { formatCurrency } from "@/lib/currency-formatter";
import { formatDate } from "@/lib/date";
import { ColumnDef } from "@tanstack/react-table";
import { DoctorCellAction } from "./doctor-cell-action";

export const doctorColumn: ColumnDef<Doctor>[] = [
  {
    header: "No",
    cell: ({ row }) => {
      return <NumberCellColumn index={row.index} />;
    },
  },
  {
    accessorKey: "user",
    header: "Name",
    cell: ({ row }) => {
      return row.original.user.name;
    },
  },
  {
    accessorKey: "type",
    header: "Speciality",
    cell: ({ row }) => {
      return row.original.type.name;
    },
  },
  {
    accessorKey: "fee",
    header: "Fee (MMK)",
    cell: ({ row }) => {
      return formatCurrency(row.original.fee);
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
      return <DoctorCellAction data={row.original} />;
    },
  },
];
