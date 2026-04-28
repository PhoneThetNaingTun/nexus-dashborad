"use client";

import { DataTable } from "@/components/ui/data-table";
import { Pagination } from "@/lib/api/types/common";
import { useAppointmentSearchParams } from "@/lib/nuqs/searchParams";

import {
  Appointment,
  APPOINTMENT_STATUS,
  AppointmentStatus,
} from "@/lib/api/types/appointment";
import { appointmentColumns } from "./appointment-column";

interface AppointmentViewProps {
  data: Appointment[];
  pagination?: Pagination;
  isTodayAppointment?: boolean;
}

export const AppointmentView = ({ data, pagination,isTodayAppointment = false }: AppointmentViewProps) => {
  const [{ search, status, date }, setParams] = useAppointmentSearchParams();

  const handleFilterChange = (value: AppointmentStatus) => {
    setParams({ status: value });
  };

  const handleDateChange = (date: string) => {
    setParams({ date });
  };
  const filterOptions = Object.values(APPOINTMENT_STATUS).map((status) => ({
    label: status,
    value: status,
  }));
  return (
    <div>
      <DataTable
        data={data}
        totalPages={pagination?.totalPages}
        totalCount={pagination?.totalCount}
        columns={appointmentColumns}
        // search
        showSearch
        search={search}
        setSearch={(value) => setParams({ search: value })}
        // Filter
        showFilter={!isTodayAppointment}
        filterOptions={filterOptions}
        filterValue={status as string}
        setFilter={(value) => handleFilterChange(value as AppointmentStatus)}
        // date
        showDateFilter={!isTodayAppointment}
        dateValue={date}
        setDateValue={handleDateChange}
      />
    </div>
  );
};
