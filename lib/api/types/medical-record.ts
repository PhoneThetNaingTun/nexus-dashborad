import { Doctor } from "./doctor";
import { Prescription } from "./prescription";

export interface MedicalRecord {
  id: string;
  appointmentId: string;
  patientId: string;
  doctorId: string;
  doctor: Doctor;
  diagnosis: string;
  symptoms: string;
  weight?: number;
  bloodPressure?: string;
  followUpDate?: string;
  advice?: string;
  createdAt: string;
  updatedAt: string;

  prescriptions: Prescription[];
}
