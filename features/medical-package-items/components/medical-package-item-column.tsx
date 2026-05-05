"use client";

import { NumberCellColumn } from "@/components/common/number-cell-column";
import { MedicalPackageItem } from "@/lib/api/types/medical-package-item";
import { formatDate } from "@/lib/date";
import { ColumnDef } from "@tanstack/react-table";
import { MedicalPackageItemCellAction } from "./medical-package-item-cell-action";

export const medicalPackageItemColumns: ColumnDef<MedicalPackageItem>[] = [
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
      return <MedicalPackageItemCellAction data={row.original} />;
    },
  },
];
