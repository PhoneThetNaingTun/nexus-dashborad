"use client";

import { DataTable } from "@/components/ui/data-table";
import { Pagination } from "@/lib/api/types/common";
import { useMedicalPackageHistorySearchParams } from "@/lib/nuqs/searchParams";

import {
  PACKAGE_STATUS,
  PackageStatus,
  UserPackage,
} from "@/lib/api/types/user-package";
import { medicalPackageHistoryColumns } from "./medical-package-history-column";

interface MedicalPackageHistoryViewProps {
  data: UserPackage[];
  pagination?: Pagination;
}

export const MedicalPackageHistoryView = ({
  data,
  pagination,
}: MedicalPackageHistoryViewProps) => {
  const [{ search, status }, setParams] =
    useMedicalPackageHistorySearchParams();

  const filterOptions = Object.values(PACKAGE_STATUS).map((status) => ({
    label: status,
    value: status,
  }));
  return (
    <div>
      <DataTable
        data={data}
        totalPages={pagination?.totalPages}
        totalCount={pagination?.totalCount}
        columns={medicalPackageHistoryColumns}
        // search
        showSearch
        search={search}
        setSearch={(value) => setParams({ search: value })}
        // filter
        showFilter
        filterValue={status ?? ""}
        filterOptions={filterOptions}
        setFilter={(value) => setParams({ status: value as PackageStatus })}
      />
    </div>
  );
};
