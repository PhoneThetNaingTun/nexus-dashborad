import { DataTableSkeleton } from "@/components/common/data-table-skeleton";
import { MedicalPackageItemView } from "@/features/medical-package-items/components/medical-package-item-view";
import { api } from "@/lib/api/api";
import { loadMedicalPackageItemSearchParams } from "@/lib/nuqs/loaderParams";
import { SearchParams } from "nuqs/server";
import { Suspense } from "react";

const MedicalPackageItemPage = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const { pageIndex, pageSize, search } =
    await loadMedicalPackageItemSearchParams(searchParams);
  const { data, pagination } = await api.medicalPackageItem.list({
    params: { page: pageIndex, pageSize: pageSize, search: search },
  });

  return (
    <Suspense fallback={<DataTableSkeleton />}>
      <MedicalPackageItemView data={data} pagination={pagination} />
    </Suspense>
  );
};

export default MedicalPackageItemPage;
