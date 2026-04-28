"use client";

import { DataTable } from "@/components/ui/data-table";
import { Pagination } from "@/lib/api/types/common";
import { useBrandSearchParams } from "@/lib/nuqs/searchParams";
import { useState } from "react";

import { Brand } from "@/lib/api/types/brand";
import { brandColumn } from "./brand-column";
import { BrandDialog } from "./brand-dialog";

interface BrandViewProps {
  data: Brand[];
  pagination?: Pagination;
}

export const BrandView = ({ data, pagination }: BrandViewProps) => {
  const [{ search }, setParams] = useBrandSearchParams();
  const [showDialog, setShowDialog] = useState<boolean>(false);
  return (
    <div>
      <DataTable
        data={data}
        totalPages={pagination?.totalPages}
        totalCount={pagination?.totalCount}
        columns={brandColumn}
        // search
        showSearch
        search={search}
        setSearch={(value) => setParams({ search: value })}
        // Create
        showCreateButton
        onCreate={() => setShowDialog(true)}
      />
      <BrandDialog open={showDialog} setOpen={setShowDialog} mode="create" />
    </div>
  );
};
