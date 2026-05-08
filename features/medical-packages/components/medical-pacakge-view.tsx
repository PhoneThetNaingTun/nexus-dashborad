"use client";

import { DataTable } from "@/components/ui/data-table";
import { Pagination } from "@/lib/api/types/common";
import { useMedicalPackageSearchParams } from "@/lib/nuqs/searchParams";
import { useState } from "react";

import { MedicalPackage } from "@/lib/api/types/medical-package";
import { medicalPackageColumns } from "./medical-package-column";
import { MedicalPackageDialog } from "./Medical-package-dialog";

interface MedicalPackageViewProps {
  data: MedicalPackage[];
  pagination?: Pagination;
}

export const MedicalPackageView = ({
  data,
  pagination,
}: MedicalPackageViewProps) => {
  const [{ search }, setParams] = useMedicalPackageSearchParams();
  const [showDialog, setShowDialog] = useState<boolean>(false);
  return (
    <div>
      <DataTable
        data={data}
        totalPages={pagination?.totalPages}
        totalCount={pagination?.totalCount}
        columns={medicalPackageColumns}
        // search
        showSearch
        search={search}
        setSearch={(value) => setParams({ search: value })}
        // Create
        showCreateButton
        onCreate={() => setShowDialog(true)}
      />
      <MedicalPackageDialog
        open={showDialog}
        setOpen={setShowDialog}
        mode="create"
      />
    </div>
  );
};
