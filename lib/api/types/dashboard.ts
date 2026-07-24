import { AppointmentStatus } from "./appointment";
import { Role } from "./user";

export interface DashboardAppointment {
  id: string;
  appointmentTime: string;
  status: AppointmentStatus;
  patientName: string;
  doctorName: string;
}

export interface DashboardHourlyPoint {
  hour: number;
  count: number;
}

export interface DashboardAppointments {
  total: number;
  waiting: number;
  completed: number;
  breakdown: Record<Exclude<AppointmentStatus, "CANCELLED">, number>;
  hourly: DashboardHourlyPoint[];
  queue: DashboardAppointment[];
  upcoming: DashboardAppointment[];
}

interface DashboardSummaryBase {
  role: Role;
  displayName: string;
  date: string;
  appointments: DashboardAppointments;
}

export interface AdminDashboardSummary extends DashboardSummaryBase {
  role: "ADMIN";
  admin: {
    revenue: number;
    recentPackageSales: {
      id: string;
      packageName: string;
      patientName: string;
      purchasedPrice: number;
      purchaseDate: string;
    }[];
  };
}

export interface DoctorDashboardSummary extends DashboardSummaryBase {
  role: "DOCTOR";
}

export type DashboardSummary =
  | AdminDashboardSummary
  | DoctorDashboardSummary;
