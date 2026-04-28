import { DataTableSkeleton } from "@/components/common/data-table-skeleton";
import { DoctorView } from "@/features/doctors/components/doctor-view";
import { api } from "@/lib/api/api";
import { loadDoctorSearchParams } from "@/lib/nuqs/loaderParams";
import { SearchParams } from "nuqs/server";
import { Suspense } from "react";

const DoctorPage = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const { pageIndex, pageSize, search } =
    await loadDoctorSearchParams(searchParams);
  const { data, pagination } = await api.doctor.list({
    params: { page: pageIndex, pageSize: pageSize, search: search },
  });

  return (
    <Suspense fallback={<DataTableSkeleton />}>
      <DoctorView data={data} pagination={pagination} />
    </Suspense>
  );
};

export default DoctorPage;
