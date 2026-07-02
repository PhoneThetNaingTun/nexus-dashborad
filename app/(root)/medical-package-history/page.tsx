import { DataTableSkeleton } from "@/components/common/data-table-skeleton";
import { MedicalPackageHistoryView } from "@/features/medical-package-history/components/medical-package-history-view";
import { api } from "@/lib/api/api";
import { loadMedicalPackageHistorySearchParams } from "@/lib/nuqs/loaderParams";
import { SearchParams } from "nuqs/server";
import { Suspense } from "react";

const MedicalPackageHistoryPage = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const { pageIndex, pageSize, search, status } =
    await loadMedicalPackageHistorySearchParams(searchParams);
  const { data, pagination } = await api.userPackage.list({
    params: {
      page: pageIndex,
      pageSize: pageSize,
      search: search,
      status: status === null ? undefined : status,
    },
  });

  return (
    <Suspense fallback={<DataTableSkeleton />}>
      <MedicalPackageHistoryView data={data} pagination={pagination} />
    </Suspense>
  );
};

export default MedicalPackageHistoryPage;
