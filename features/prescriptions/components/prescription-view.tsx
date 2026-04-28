"use client";

import { DataTable } from "@/components/ui/data-table";
import { Prescription } from "@/lib/api/types/prescription";
import { useState } from "react";
import { prescriptionColumns } from "./prescription-column";
import { PrescriptionDialog } from "./prescription-dialog";

interface PrescriptionViewProps {
  data: Prescription[];
  medicalRecordId: string;
}

export const PrescriptionView = ({
  data,
  medicalRecordId,
}: PrescriptionViewProps) => {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  return (
    <div>
      <DataTable
        data={data}
        totalPages={1}
        totalCount={data.length}
        columns={prescriptionColumns}
        showTablePagination={false}
        title="Prescriptions"
        // Create
        showCreateButton
        onCreate={() => setShowDialog(true)}
      />

      <PrescriptionDialog
        mode="create"
        open={showDialog}
        setOpen={setShowDialog}
        requireData={{ medicalRecordId }}
      />
    </div>
  );
};
