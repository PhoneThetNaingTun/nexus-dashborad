"use client";

import { DataTable } from "@/components/ui/data-table";
import { Pagination } from "@/lib/api/types/common";
import { Schedule } from "@/lib/api/types/schedule";
import { useScheduleSearchParams } from "@/lib/nuqs/searchParams";
import { useState } from "react";
import { scheduleColumn } from "./schedule-column";
import { ScheduleDialog } from "./schedule-dialog";

interface ScheduleViewProps {
  data: Schedule[];
  pagination?: Pagination;
}

export const ScheduleView = ({ data, pagination }: ScheduleViewProps) => {
  const [{ search }, setParams] = useScheduleSearchParams();
  const [showDialog, setShowDialog] = useState<boolean>(false);
  return (
    <div>
      <DataTable
        data={data}
        totalPages={pagination?.totalPages}
        totalCount={pagination?.totalCount}
        columns={scheduleColumn}
        // search
        showSearch
        search={search}
        setSearch={(value) => setParams({ search: value })}
        // Create
        showCreateButton
        onCreate={() => setShowDialog(true)}
      />

      <ScheduleDialog mode="create" open={showDialog} setOpen={setShowDialog} />
    </div>
  );
};
