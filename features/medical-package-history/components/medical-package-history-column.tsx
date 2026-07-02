"use client";

import { NumberCellColumn } from "@/components/common/number-cell-column";
import { Badge } from "@/components/ui/badge";
import { UserPackage } from "@/lib/api/types/user-package";
import { formatCurrency } from "@/lib/currency-formatter";
import { formatDate } from "@/lib/date";
import { ColumnDef } from "@tanstack/react-table";
import { useGetUserPackageStatusVariant } from "../hooks/use-get-status-variant";
import { MedicalPackageHistoryCellAction } from "./medical-package-history-cell-action";

export const medicalPackageHistoryColumns: ColumnDef<UserPackage>[] = [
  {
    header: "No",
    cell: ({ row }) => {
      return <NumberCellColumn index={row.index} />;
    },
  },
  {
    header: "Patient Name",
    cell: ({ row }) => {
      return row.original.patient.name;
    },
  },
  {
    accessorKey: "medicalPackage.name",
    header: "Medial Package",
    cell: ({ row }) => {
      return row.original.package.name;
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      return formatCurrency(row.original.purchasedPrice);
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const statusVariant = useGetUserPackageStatusVariant(row.original.status);
      return <Badge variant={statusVariant}>{row.original.status}</Badge>;
    },
  },
  {
    accessorKey: "purchaseDate",
    header: "Purchase Date",
    cell: ({ row }) => {
      return formatDate(row.original.purchaseDate);
    },
  },
  {
    accessorKey: "expiryDate",
    header: "Expiry Date",
    cell: ({ row }) => {
      return row.original.expiryDate
        ? formatDate(row.original.expiryDate)
        : "N/A";
    },
  },
  {
    header: "Action",
    cell: ({ row }) => {
      return <MedicalPackageHistoryCellAction data={row.original} />;
    },
  },
];
