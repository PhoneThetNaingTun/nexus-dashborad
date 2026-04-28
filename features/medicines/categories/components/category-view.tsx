"use client";

import { DataTable } from "@/components/ui/data-table";
import { Pagination } from "@/lib/api/types/common";
import { useCategorySearchParams } from "@/lib/nuqs/searchParams";
import { useState } from "react";

import { Category } from "@/lib/api/types/category";
import { categoryColumn } from "./category-column";
import { CategoryDialog } from "./category-dialog";

interface CategoryViewProps {
  data: Category[];
  pagination?: Pagination;
}

export const CategoryView = ({ data, pagination }: CategoryViewProps) => {
  const [{ search }, setParams] = useCategorySearchParams();
  const [showDialog, setShowDialog] = useState<boolean>(false);
  return (
    <div>
      <DataTable
        data={data}
        totalPages={pagination?.totalPages}
        totalCount={pagination?.totalCount}
        columns={categoryColumn}
        // search
        showSearch
        search={search}
        setSearch={(value) => setParams({ search: value })}
        // Create
        showCreateButton
        onCreate={() => setShowDialog(true)}
      />
      <CategoryDialog open={showDialog} setOpen={setShowDialog} mode="create" />
    </div>
  );
};
