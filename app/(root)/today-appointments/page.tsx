import { DataTableSkeleton } from "@/components/common/data-table-skeleton";
import { AppointmentView } from "@/features/appointments/components/appointment-view";
import { api } from "@/lib/api/api";
import { formatDate } from "@/lib/date";
import { loadAppointmentSearchParams } from "@/lib/nuqs/loaderParams";
import { SearchParams } from "nuqs/server";
import { Suspense } from "react";

const TodayAppointmentPage = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const { pageIndex, pageSize, search } =
    await loadAppointmentSearchParams(searchParams);
  const { data, pagination } = await api.appointment.list({
    params: {
      page: pageIndex,
      pageSize: pageSize,
      search,
      status: "CONFIRMED",
      date: formatDate(new Date()),
    },
  });

  return (
    <Suspense fallback={<DataTableSkeleton />}>
      <AppointmentView data={data} pagination={pagination} isTodayAppointment />
    </Suspense>
  );
};

export default TodayAppointmentPage;
