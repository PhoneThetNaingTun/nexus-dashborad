import { Medicine } from "./medicine";

export interface Prescription {
  id: string;
  medicalRecordId: string;
  medicineId: string;
  dosage: string;
  frequency: string;
  duration: string;
  totalQuantity: number;
  instructions?: string;
  medicine: Medicine;
}
