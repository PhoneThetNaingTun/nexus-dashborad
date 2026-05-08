"use client";

import { NumberCellColumn } from "@/components/common/number-cell-column";
import { Badge } from "@/components/ui/badge";
import { MedicalPackage } from "@/lib/api/types/medical-package";
import { formatCurrency } from "@/lib/currency-formatter";
import { formatDate } from "@/lib/date";
import { ColumnDef } from "@tanstack/react-table";
import { MedicalPackageCellAction } from "./medical-package-cell-action";

export const medicalPackageColumns: ColumnDef<MedicalPackage>[] = [
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
    accessorKey: "MedicalPackageItems",
    header: "Total Package Items",
    cell: ({ row }) => {
      return row.original.medicalPackageItems.length;
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      return formatCurrency(row.original.price);
    },
  },
  {
    accessorKey: "isActive",
    header: "Is Active",
    cell: ({ row }) => {
      return (
        <Badge variant={row.original.isActive ? "success" : "destructive"}>
          {row.original.isActive ? "Active" : "Inactive"}
        </Badge>
      );
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
      return <MedicalPackageCellAction data={row.original} />;
    },
  },
];
