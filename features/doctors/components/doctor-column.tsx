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
    accessorKey: "user.image",
    header: "Image",
    cell: ({ row }) => {
      const image = row.original.user.image;
      return (
        <div className="flex items-center justify-center">
          <img
            src={image || "/images/user-fallback.png"}
            alt={row.original.user.name}
            className="h-8 w-8 rounded-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "/images/user-fallback.png";
            }}
          />
        </div>
      );
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
