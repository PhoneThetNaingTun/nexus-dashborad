"use client";

import { DataTable } from "@/components/ui/data-table";
import { Pagination } from "@/lib/api/types/common";
import { useMedicineSearchParams } from "@/lib/nuqs/searchParams";
import { useState } from "react";

import { Medicine } from "@/lib/api/types/medicine";
import { medicineColumns } from "./medicine-column";
import { MedicineDialog } from "./medicine-dialog";

interface MedicineViewProps {
  data: Medicine[];
  pagination?: Pagination;
}

export const MedicineView = ({ data, pagination }: MedicineViewProps) => {
  const [{ search }, setParams] = useMedicineSearchParams();
  const [showDialog, setShowDialog] = useState<boolean>(false);
  return (
    <div>
      <DataTable
        data={data}
        totalPages={pagination?.totalPages}
        totalCount={pagination?.totalCount}
        columns={medicineColumns}
        // search
        showSearch
        search={search}
        setSearch={(value) => setParams({ search: value })}
        // Create
        showCreateButton
        onCreate={() => setShowDialog(true)}
      />
      <MedicineDialog open={showDialog} setOpen={setShowDialog} mode="create" />
    </div>
  );
};
