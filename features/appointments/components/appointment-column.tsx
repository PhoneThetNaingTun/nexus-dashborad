"use client";

import { NumberCellColumn } from "@/components/common/number-cell-column";
import {
  formatAppointmentTimeToDate,
  formatAppointmentTimeToTime,
} from "@/lib/date";
import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Appointment, AppointmentStatus } from "@/lib/api/types/appointment";
import { AppointmentCellAction } from "./appointment-cell-action";

export const appointmentColumns: ColumnDef<Appointment>[] = [
  {
    header: "No",
    cell: ({ row }) => {
      return <NumberCellColumn index={row.index} />;
    },
  },
  {
    accessorKey: "patient.name",
    header: "Patient Name",
  },
  {
    accessorKey: "patient.email",
    header: "Patient E-mail",
  },
  {
    accessorKey: "doctor.user.name",
    header: "Doctor",
  },
  {
    accessorKey: "appointmentTime",
    header: "Appointment Time",
    cell: ({ row }) => {
      return formatAppointmentTimeToTime(row.original.appointmentTime);
    },
  },
  {
    header: "Booking Date",
    cell: ({ row }) => {
      return formatAppointmentTimeToDate(row.original.appointmentTime);
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const getBadgeVariant = (status: AppointmentStatus) => {
        switch (status) {
          case "PENDING":
            return "warning";
          case "COMPLETED":
            return "success";
          case "CANCELLED":
            return "destructive";
          default:
            return "default";
        }
      };
      return (
        <Badge variant={getBadgeVariant(row.original.status)}>
          {row.original.status}
        </Badge>
      );
    },
  },

  {
    header: "Action",
    cell: ({ row }) => {
      return <AppointmentCellAction data={row.original} />;
    },
  },
];
