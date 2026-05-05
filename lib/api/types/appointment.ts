import { Doctor } from "./doctor";
import { MedicalRecord } from "./medical-record";
import { User } from "./user";

export const APPOINTMENT_STATUS = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  CANCELLED: "CANCELLED",
  COMPLETED: "COMPLETED",
  CHECKING: "CHECKING",
} as const;

export type AppointmentStatus =
  (typeof APPOINTMENT_STATUS)[keyof typeof APPOINTMENT_STATUS];

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  appointmentTime: string;
  status: AppointmentStatus;
  notes?: string;

  actualStartTime?: string;
  actualEndTime?: string;

  createdAt: string;
  updatedAt: string;

  doctor: Doctor;
  patient: User;
  medicalRecord?: MedicalRecord;
}

export interface StatusUpdatePayload {
  id: string;
}

export interface AppointmentApprovePayload extends StatusUpdatePayload {}
export interface AppointmentRejectPayload extends StatusUpdatePayload {}

export interface AppointmentUpdateStatusPayload {
  status: AppointmentStatus;
}
