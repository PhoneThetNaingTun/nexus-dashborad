import { MedicalPackage } from "./medical-package";
import { MedicalRecord } from "./medical-record";
import { User } from "./user";

export interface UserPackage {
  id: string;
  packageId: string;
  package: MedicalPackage;
  patientId: string;
  patient: User;
  purchasedPrice: number;
  paymentScreenshot?: string;
  status: PackageStatus;
  purchaseDate: string;
  expiryDate?: string;
  usedAt?: string;
  medicalRecordId?: string;
  medicalRecord?: MedicalRecord;
}

export const PACKAGE_STATUS = {
  PENDING: "PENDING",
  PURCHASED: "PURCHASED",
  USED: "USED",
  EXPIRED: "EXPIRED",
  REFUNDED: "REFUNDED",
  REJECTED: "REJECTED",
} as const;

export type PackageStatus =
  (typeof PACKAGE_STATUS)[keyof typeof PACKAGE_STATUS];
