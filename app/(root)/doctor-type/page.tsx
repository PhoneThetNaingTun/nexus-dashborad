import { DataTableSkeleton } from "@/components/common/data-table-skeleton";
import { DoctorTypeView } from "@/features/doctor-types/components/doctor-type-view";
import { api } from "@/lib/api/api";
import { loadDoctorTypeSearchParams } from "@/lib/nuqs/loaderParams";
import { SearchParams } from "nuqs/server";
import { Suspense } from "react";

const DoctorTypePage = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const { pageIndex, pageSize, search } =
    await loadDoctorTypeSearchParams(searchParams);
  const { data, pagination } = await api.doctor_type.list({
    params: { page: pageIndex, pageSize: pageSize, search: search },
  });

  return (
    <Suspense fallback={<DataTableSkeleton />}>
      <DoctorTypeView data={data} pagination={pagination} />
    </Suspense>
  );
};

export default DoctorTypePage;
