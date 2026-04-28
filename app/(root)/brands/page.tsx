import { DataTableSkeleton } from "@/components/common/data-table-skeleton";
import { BrandView } from "@/features/medicines/brands/components/brand-view";
import { api } from "@/lib/api/api";
import { loadBrandSearchParams } from "@/lib/nuqs/loaderParams";
import { SearchParams } from "nuqs/server";
import { Suspense } from "react";

const BrandPage = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const { pageIndex, pageSize, search } =
    await loadBrandSearchParams(searchParams);
  const { data, pagination } = await api.brand.list({
    params: { page: pageIndex, pageSize: pageSize, search: search },
  });

  return (
    <Suspense fallback={<DataTableSkeleton />}>
      <BrandView data={data} pagination={pagination} />
    </Suspense>
  );
};

export default BrandPage;
