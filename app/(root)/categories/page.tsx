import { DataTableSkeleton } from "@/components/common/data-table-skeleton";
import { CategoryView } from "@/features/medicines/categories/components/category-view";
import { api } from "@/lib/api/api";
import { loadCategorySearchParams } from "@/lib/nuqs/loaderParams";
import { SearchParams } from "nuqs/server";
import { Suspense } from "react";

const CategoryPage = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  const { pageIndex, pageSize, search } =
    await loadCategorySearchParams(searchParams);
  const { data, pagination } = await api.category.list({
    params: { page: pageIndex, pageSize: pageSize, search: search },
  });

  return (
    <Suspense fallback={<DataTableSkeleton />}>
      <CategoryView data={data} pagination={pagination} />
    </Suspense>
  );
};

export default CategoryPage;
