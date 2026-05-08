import { DataTableSkeleton } from "@/components/common/data-table-skeleton";
import { MedicalPackageView } from "@/features/medical-packages/components/medical-pacakge-view";
import { api } from "@/lib/api/api";
import { loadMedicalPackageSearchParams } from "@/lib/nuqs/loaderParams";
import { SearchParams } from "nuqs/server";
import { Suspense } from "react";

const MedicalPackagePage = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const { pageIndex, pageSize, search } =
    await loadMedicalPackageSearchParams(searchParams);
  const { data, pagination } = await api.medicalPackage.list({
    params: { page: pageIndex, pageSize: pageSize, search: search },
  });

  return (
    <Suspense fallback={<DataTableSkeleton />}>
      <MedicalPackageView data={data} pagination={pagination} />
    </Suspense>
  );
};

export default MedicalPackagePage;
