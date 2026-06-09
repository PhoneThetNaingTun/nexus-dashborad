import { PACKAGE_STATUS, PackageStatus } from "@/lib/api/types/user-package";

export const useGetUserPackageStatusVariant = (status: PackageStatus) => {
  switch (status) {
    case PACKAGE_STATUS.PENDING:
      return "warning";
    case PACKAGE_STATUS.PURCHASED:
      return "success";
    case PACKAGE_STATUS.USED:
      return "default";
    case PACKAGE_STATUS.EXPIRED:
      return "destructive";
    case PACKAGE_STATUS.REFUNDED:
      return "destructive";
    case PACKAGE_STATUS.REJECTED:
      return "destructive";
    default:
      return "default";
  }
};
