"use client";

import { NumberCellColumn } from "@/components/common/number-cell-column";
import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Days_OF_WEEK, Schedule } from "@/lib/api/types/schedule";
import { cn } from "@/lib/utils";
import { ScheduleCellAction } from "./schedule-cell-action";

export const scheduleColumn: ColumnDef<Schedule>[] = [
  {
    header: "No",
    cell: ({ row }) => {
      return <NumberCellColumn index={row.index} />;
    },
  },
  {
    accessorKey: "dayOfWeek",
    header: "Day of week",
    cell: ({ row }) => {
      const dayOfWeek = row.original.dayOfWeek;
      const day =
        Days_OF_WEEK.find((day) => day.value === dayOfWeek)?.label || "Unknown";
      return <span>{day}</span>;
    },
  },
  {
    accessorKey: "startTime",
    header: "Start Time",
  },
  {
    accessorKey: "endTime",
    header: "End Time",
  },
  { accessorKey: "slotDuration", header: "Slot Duration (minutes)" },
  {
    accessorKey: "isActive",
    header: "Is Active",
    cell: ({ row }) => {
      const isActive = row.original.isActive;

      return (
        <Badge className={cn(isActive ? "bg-green-500" : "bg-red-500")}>
          {isActive ? "Available" : "Not Available"}
        </Badge>
      );
    },
  },
  {
    header: "Action",
    cell: ({ row }) => {
      return <ScheduleCellAction data={row.original} />;
    },
  },
];
