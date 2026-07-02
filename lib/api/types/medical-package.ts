import { MedicalPackageItem } from "./medical-package-item";

export interface MedicalPackage {
  id: string;
  name: string;
  description?: string;
  price: number;
  isActive: boolean;

  medicalPackageItems: MedicalPackageItem[];

  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}
