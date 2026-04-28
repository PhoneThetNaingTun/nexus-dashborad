import { DataTableSkeleton } from "@/components/common/data-table-skeleton";
import { MedicineView } from "@/features/medicines/components/medicine-view";
import { api } from "@/lib/api/api";
import { loadMedicineSearchParams } from "@/lib/nuqs/loaderParams";
import { SearchParams } from "nuqs/server";
import { Suspense } from "react";

const MedicinePage = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const { pageIndex, pageSize, search } =
    await loadMedicineSearchParams(searchParams);
  const { data, pagination } = await api.medicine.list({
    params: { page: pageIndex, pageSize: pageSize, search: search },
  });

  return (
    <Suspense fallback={<DataTableSkeleton />}>
      <MedicineView data={data} pagination={pagination} />
    </Suspense>
  );
};

export default MedicinePage;
