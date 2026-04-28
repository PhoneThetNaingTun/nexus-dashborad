"use client";

import { DataTable } from "@/components/ui/data-table";
import { Pagination } from "@/lib/api/types/common";
import { DoctorType } from "@/lib/api/types/doctor-type";
import { useDoctorTypeSearchParams } from "@/lib/nuqs/searchParams";
import { useState } from "react";
import { doctorTypeColumn } from "./doctor-type-column";
import { DoctorTypeDialog } from "./doctor-type-dialog";

interface DoctorTypeViewProps {
  data: DoctorType[];
  pagination?: Pagination;
}

export const DoctorTypeView = ({ data, pagination }: DoctorTypeViewProps) => {
  const [{ search }, setParams] = useDoctorTypeSearchParams();
  const [showDialog, setShowDialog] = useState<boolean>(false);
  return (
    <div>
      <DataTable
        data={data}
        totalPages={pagination?.totalPages}
        totalCount={pagination?.totalCount}
        columns={doctorTypeColumn}
        // search
        showSearch
        search={search}
        setSearch={(value) => setParams({ search: value })}
        // Create
        showCreateButton
        onCreate={() => setShowDialog(true)}
      />

      <DoctorTypeDialog
        mode="create"
        open={showDialog}
        setOpen={setShowDialog}
      />
    </div>
  );
};
