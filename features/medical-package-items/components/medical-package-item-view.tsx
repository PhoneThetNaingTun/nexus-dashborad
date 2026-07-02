"use client";

import { DataTable } from "@/components/ui/data-table";
import { Pagination } from "@/lib/api/types/common";
import { useMedicalPackageItemSearchParams } from "@/lib/nuqs/searchParams";
import { useState } from "react";

import { MedicalPackageItem } from "@/lib/api/types/medical-package-item";
import { medicalPackageItemColumns } from "./medical-package-item-column";
import { MedicalPackageItemDialog } from "./medical-package-item-dialog";

interface MedicalPackageItemViewProps {
  data: MedicalPackageItem[];
  pagination?: Pagination;
}

export const MedicalPackageItemView = ({
  data,
  pagination,
}: MedicalPackageItemViewProps) => {
  const [{ search }, setParams] = useMedicalPackageItemSearchParams();
  const [showDialog, setShowDialog] = useState<boolean>(false);
  return (
    <div>
      <DataTable
        data={data}
        totalPages={pagination?.totalPages}
        totalCount={pagination?.totalCount}
        columns={medicalPackageItemColumns}
        // search
        showSearch
        search={search}
        setSearch={(value) => setParams({ search: value })}
        // Create
        showCreateButton
        onCreate={() => setShowDialog(true)}
      />
      <MedicalPackageItemDialog
        open={showDialog}
        setOpen={setShowDialog}
        mode="create"
      />
    </div>
  );
};
