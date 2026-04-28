"use client";

import { DataTable } from "@/components/ui/data-table";
import { Pagination } from "@/lib/api/types/common";
import { Doctor } from "@/lib/api/types/doctor";
import { useDoctorSearchParams } from "@/lib/nuqs/searchParams";
import { useState } from "react";
import { doctorColumn } from "./doctor-column";
import { DoctorDialog } from "./doctor-dialog";

interface DoctorViewProps {
  data: Doctor[];
  pagination?: Pagination;
}

export const DoctorView = ({ data, pagination }: DoctorViewProps) => {
  const [{ search }, setParams] = useDoctorSearchParams();
  const [showDialog, setShowDialog] = useState<boolean>(false);
  return (
    <div>
      <DataTable
        data={data}
        totalPages={pagination?.totalPages}
        totalCount={pagination?.totalCount}
        columns={doctorColumn}
        // search
        showSearch
        search={search}
        setSearch={(value) => setParams({ search: value })}
        // Create
        showCreateButton
        onCreate={() => setShowDialog(true)}
      />

      <DoctorDialog mode="create" open={showDialog} setOpen={setShowDialog} />
    </div>
  );
};
