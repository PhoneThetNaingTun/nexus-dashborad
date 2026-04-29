"use client";

import { NumberCellColumn } from "@/components/common/number-cell-column";
import { Prescription } from "@/lib/api/types/prescription";
import { ColumnDef } from "@tanstack/react-table";
import { PrescriptionCellAction } from "./prescription-cell-action";

export const prescriptionColumns: ColumnDef<Prescription>[] = [
  {
    header: "No",
    cell: ({ row }) => {
      return <NumberCellColumn index={row.index} />;
    },
  },
  {
    header: "Medicine Name",
    cell: ({ row }) => row.original.medicine.name,
  },
  { accessorKey: "frequency", header: "Frequency" },
  { accessorKey: "dosage", header: "Dosage" },
  { accessorKey: "totalQuantity", header: "Total Quantity" },

  {
    header: "Action",
    cell: ({ row }) => {
      return <PrescriptionCellAction data={row.original} />;
    },
  },
];
