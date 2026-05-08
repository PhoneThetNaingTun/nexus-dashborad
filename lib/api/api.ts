import { DoctorTypeSchema } from "@/features/doctor-types/schema/doctor-type.schema";
import { ScheduleSchema } from "@/features/doctors/schedules/schema/scheduleSchema";
import { DoctorSchema } from "@/features/doctors/schema/doctorSchema";
import { MedicalPackageItemSchema } from "@/features/medical-package-items/schema/medical-package-item.schema";
import { MedicalPackageSchema } from "@/features/medical-packages/schema/medical-package.schema";
import { MedicalRecordSchema } from "@/features/medical-records/schema/medical-records.schema";
import { BrandSchema } from "@/features/medicines/brands/schema/brand-schema";
import { CategorySchema } from "@/features/medicines/categories/schema/category-schema";
import { MedicineSchema } from "@/features/medicines/schema/medicineSchema";
import { PrescriptionSchema } from "@/features/prescriptions/schema/prescription.schema";
import { END_POINTS } from "./config";
import { baseAPi } from "./http";
import {
  Appointment,
  AppointmentApprovePayload,
  AppointmentRejectPayload,
  AppointmentStatus,
  AppointmentUpdateStatusPayload,
} from "./types/appointment";
import { Brand } from "./types/brand";
import { Category } from "./types/category";
import { Doctor } from "./types/doctor";
import { DoctorType } from "./types/doctor-type";
import { MedicalPackage } from "./types/medical-package";
import { MedicalPackageItem } from "./types/medical-package-item";
import { MedicalRecord } from "./types/medical-record";
import { Medicine } from "./types/medicine";
import { Prescription } from "./types/prescription";
import { Schedule } from "./types/schedule";
import { User } from "./types/user";

export const api = {
  // Auth api
  auth: {
    login: async <T>(payload: any) => {
      return await baseAPi.post<T>(END_POINTS.AUTH.LOGIN, payload);
    },
    me: async () => {
      return await baseAPi.get<User>(END_POINTS.AUTH.ME);
    },
    refresh: async () => {
      return await baseAPi.post(END_POINTS.AUTH.REFRESH);
    },
    logout: async () => {
      return await baseAPi.post(END_POINTS.AUTH.LOGOUT);
    },
  },
  // Doctor Type api
  doctor_type: {
    list: async ({
      params,
    }: {
      params: { page?: number; pageSize?: number; search?: string };
    }) => {
      const searchParams = new URLSearchParams();

      if (params.page !== null && params.page !== undefined)
        searchParams.set("page", params.page.toString());
      if (params.pageSize !== null && params.pageSize !== undefined)
        searchParams.set("pageSize", params.pageSize.toString());
      if (params.search) searchParams.set("search", params.search.toString());

      return await baseAPi.get<DoctorType[]>(
        `${END_POINTS.DOCTOR_TYPE.LIST}?${searchParams.toString()}`,
      );
    },
    create: async (payload: DoctorTypeSchema) => {
      return await baseAPi.post<DoctorType>(
        END_POINTS.DOCTOR_TYPE.CREATE,
        payload,
      );
    },
    update: async (id: string, payload: DoctorTypeSchema) => {
      return await baseAPi.patch<DoctorType>(
        `${END_POINTS.DOCTOR_TYPE.UPDATE(id)}`,
        payload,
      );
    },
    delete: async (id: string) => {
      return await baseAPi.delete(`${END_POINTS.DOCTOR_TYPE.DELETE(id)}`);
    },
  },
  // Brand api
  brand: {
    list: async ({
      params,
    }: {
      params: { page?: number; pageSize?: number; search?: string };
    }) => {
      const searchParams = new URLSearchParams();

      if (params.page !== null && params.page !== undefined)
        searchParams.set("page", params.page.toString());
      if (params.pageSize !== null && params.pageSize !== undefined)
        searchParams.set("pageSize", params.pageSize.toString());
      if (params.search) searchParams.set("search", params.search.toString());

      return await baseAPi.get<Brand[]>(
        `${END_POINTS.BRAND.LIST}?${searchParams.toString()}`,
      );
    },

    create: async (payload: BrandSchema) => {
      return await baseAPi.post<Brand>(END_POINTS.BRAND.CREATE, payload);
    },
    update: async (id: string, payload: BrandSchema) => {
      return await baseAPi.patch<Brand>(
        `${END_POINTS.BRAND.UPDATE(id)}`,
        payload,
      );
    },
    delete: async (id: string) => {
      return await baseAPi.delete(`${END_POINTS.BRAND.DELETE(id)}`);
    },
  },

  // Category api
  category: {
    list: async ({
      params,
    }: {
      params: { page?: number; pageSize?: number; search?: string };
    }) => {
      const searchParams = new URLSearchParams();

      if (params.page !== null && params.page !== undefined)
        searchParams.set("page", params.page.toString());
      if (params.pageSize !== null && params.pageSize !== undefined)
        searchParams.set("pageSize", params.pageSize.toString());
      if (params.search) searchParams.set("search", params.search.toString());

      return await baseAPi.get<Category[]>(
        `${END_POINTS.CATEGORY.LIST}?${searchParams.toString()}`,
      );
    },

    create: async (payload: CategorySchema) => {
      return await baseAPi.post<Brand>(END_POINTS.CATEGORY.CREATE, payload);
    },
    update: async (id: string, payload: CategorySchema) => {
      return await baseAPi.patch<Brand>(
        `${END_POINTS.CATEGORY.UPDATE(id)}`,
        payload,
      );
    },
    delete: async (id: string) => {
      return await baseAPi.delete(`${END_POINTS.CATEGORY.DELETE(id)}`);
    },
  },
  // Medicine api
  medicine: {
    list: async ({
      params,
    }: {
      params: { page?: number; pageSize?: number; search?: string };
    }) => {
      const searchParams = new URLSearchParams();

      if (params.page !== null && params.page !== undefined)
        searchParams.set("page", params.page.toString());
      if (params.pageSize !== null && params.pageSize !== undefined)
        searchParams.set("pageSize", params.pageSize.toString());
      if (params.search) searchParams.set("search", params.search.toString());

      return await baseAPi.get<Medicine[]>(
        `${END_POINTS.MEDICINE.LIST}?${searchParams.toString()}`,
      );
    },

    create: async (payload: MedicineSchema) => {
      return await baseAPi.post<Medicine>(END_POINTS.MEDICINE.CREATE, payload);
    },
    update: async (id: string, payload: MedicineSchema) => {
      return await baseAPi.patch<Medicine>(
        `${END_POINTS.MEDICINE.UPDATE(id)}`,
        payload,
      );
    },
    delete: async (id: string) => {
      return await baseAPi.delete(`${END_POINTS.MEDICINE.DELETE(id)}`);
    },
  },
  // Doctor api
  doctor: {
    list: async ({
      params,
    }: {
      params: { page?: number; pageSize?: number; search?: string };
    }) => {
      const searchParams = new URLSearchParams();

      if (params.page !== null && params.page !== undefined)
        searchParams.set("page", params.page.toString());
      if (params.pageSize !== null && params.pageSize !== undefined)
        searchParams.set("pageSize", params.pageSize.toString());
      if (params.search) searchParams.set("search", params.search.toString());

      return await baseAPi.get<Doctor[]>(
        `${END_POINTS.DOCTOR.LIST}?${searchParams.toString()}`,
      );
    },
    getById: async (id: string) => {
      return await baseAPi.get<Doctor>(END_POINTS.DOCTOR.GET(id));
    },
    create: async (payload: DoctorSchema) => {
      return await baseAPi.post<Doctor>(END_POINTS.DOCTOR.CREATE, payload);
    },
    update: async (id: string, payload: DoctorSchema) => {
      return await baseAPi.patch<Doctor>(
        `${END_POINTS.DOCTOR.UPDATE(id)}`,
        payload,
      );
    },
    delete: async (id: string) => {
      return await baseAPi.delete(`${END_POINTS.DOCTOR.DELETE(id)}`);
    },
  },
  // Schedule api
  schedule: {
    list: async ({
      doctorId,
      params,
    }: {
      doctorId: string;
      params: { page?: number; pageSize?: number; search?: string };
    }) => {
      const searchParams = new URLSearchParams();

      if (params.page !== null && params.page !== undefined)
        searchParams.set("page", params.page.toString());
      if (params.pageSize !== null && params.pageSize !== undefined)
        searchParams.set("pageSize", params.pageSize.toString());
      if (params.search) searchParams.set("search", params.search.toString());

      return await baseAPi.get<Schedule[]>(
        `${END_POINTS.SCHEDULE.LIST(doctorId)}?${searchParams.toString()}`,
      );
    },
    getById: async (id: string) => {
      return await baseAPi.get<Schedule>(END_POINTS.SCHEDULE.GET(id));
    },
    create: async (doctorId: string, payload: ScheduleSchema) => {
      return await baseAPi.post<Schedule>(
        END_POINTS.SCHEDULE.CREATE(doctorId),
        payload,
      );
    },
    update: async (id: string, payload: ScheduleSchema) => {
      return await baseAPi.patch<Schedule>(
        `${END_POINTS.SCHEDULE.UPDATE(id)}`,
        payload,
      );
    },
    delete: async (id: string) => {
      return await baseAPi.delete(`${END_POINTS.SCHEDULE.DELETE(id)}`);
    },
  },
  // appointment api
  appointment: {
    list: async ({
      params,
    }: {
      params: {
        page?: number;
        pageSize?: number;
        search?: string;
        status?: AppointmentStatus;
        date?: string;
      };
    }) => {
      const searchParams = new URLSearchParams();

      if (params.page !== null && params.page !== undefined)
        searchParams.set("page", params.page.toString());
      if (params.pageSize !== null && params.pageSize !== undefined)
        searchParams.set("pageSize", params.pageSize.toString());
      if (params.search) searchParams.set("search", params.search.toString());
      if (params.status) searchParams.set("status", params.status.toString());
      if (params.date) searchParams.set("date", params.date.toString());

      return await baseAPi.get<Appointment[]>(
        `${END_POINTS.APPOINTMENT.LIST}?${searchParams.toString()}`,
      );
    },
    getById: async (id: string) => {
      return await baseAPi.get<Appointment>(END_POINTS.APPOINTMENT.GET(id));
    },
    approve: async (payload: AppointmentApprovePayload) => {
      return await baseAPi.post<Appointment>(
        END_POINTS.APPOINTMENT.APPROVE,
        payload,
      );
    },
    updateStatus: async (
      id: string,
      payload: AppointmentUpdateStatusPayload,
    ) => {
      return await baseAPi.post<Appointment>(
        END_POINTS.APPOINTMENT.UPDATE_STATUS(id),
        payload,
      );
    },
    reject: async (payload: AppointmentRejectPayload) => {
      return await baseAPi.post<Appointment>(
        END_POINTS.APPOINTMENT.REJECT,
        payload,
      );
    },
  },
  // Medical Record
  medicalRecord: {
    create: async (payload: MedicalRecordSchema) => {
      return await baseAPi.post<MedicalRecord>(
        END_POINTS.MEDICAL_RECORD.CREATE,
        payload,
      );
    },
    update: async (id: string, payload: MedicalRecordSchema) => {
      return await baseAPi.patch<MedicalRecord>(
        `${END_POINTS.MEDICAL_RECORD.UPDATE(id)}`,
        payload,
      );
    },
  },
  // Prescriptions
  prescription: {
    create: async (payload: PrescriptionSchema) => {
      return await baseAPi.post<Prescription>(
        END_POINTS.PRESCRIPTION.CREATE,
        payload,
      );
    },
    update: async (id: string, payload: PrescriptionSchema) => {
      return await baseAPi.patch<Prescription>(
        `${END_POINTS.PRESCRIPTION.UPDATE(id)}`,
        payload,
      );
    },
    delete: async (id: string) => {
      return await baseAPi.delete(`${END_POINTS.PRESCRIPTION.DELETE(id)}`);
    },
  },

  // Medical package item api
  medicalPackageItem: {
    list: async ({
      params,
    }: {
      params: { page?: number; pageSize?: number; search?: string };
    }) => {
      const searchParams = new URLSearchParams();

      if (params.page !== null && params.page !== undefined)
        searchParams.set("page", params.page.toString());
      if (params.pageSize !== null && params.pageSize !== undefined)
        searchParams.set("pageSize", params.pageSize.toString());
      if (params.search) searchParams.set("search", params.search.toString());

      return await baseAPi.get<MedicalPackageItem[]>(
        `${END_POINTS.MEDICAL_PACKAGE_ITEM.LIST}?${searchParams.toString()}`,
      );
    },

    create: async (payload: MedicalPackageItemSchema) => {
      return await baseAPi.post<MedicalPackageItem>(
        END_POINTS.MEDICAL_PACKAGE_ITEM.CREATE,
        payload,
      );
    },
    update: async (id: string, payload: MedicalPackageItemSchema) => {
      return await baseAPi.patch<MedicalPackageItem>(
        `${END_POINTS.MEDICAL_PACKAGE_ITEM.UPDATE(id)}`,
        payload,
      );
    },
    delete: async (id: string) => {
      return await baseAPi.delete(
        `${END_POINTS.MEDICAL_PACKAGE_ITEM.DELETE(id)}`,
      );
    },
  },
  // Medical package api
  medicalPackage: {
    list: async ({
      params,
    }: {
      params: { page?: number; pageSize?: number; search?: string };
    }) => {
      const searchParams = new URLSearchParams();

      if (params.page !== null && params.page !== undefined)
        searchParams.set("page", params.page.toString());
      if (params.pageSize !== null && params.pageSize !== undefined)
        searchParams.set("pageSize", params.pageSize.toString());
      if (params.search) searchParams.set("search", params.search.toString());

      return await baseAPi.get<MedicalPackage[]>(
        `${END_POINTS.MEDICAL_PACKAGE.LIST}?${searchParams.toString()}`,
      );
    },

    create: async (payload: MedicalPackageSchema) => {
      return await baseAPi.post<MedicalPackage>(
        END_POINTS.MEDICAL_PACKAGE.CREATE,
        payload,
      );
    },
    update: async (id: string, payload: MedicalPackageSchema) => {
      return await baseAPi.patch<MedicalPackage>(
        `${END_POINTS.MEDICAL_PACKAGE.UPDATE(id)}`,
        payload,
      );
    },
    delete: async (id: string) => {
      return await baseAPi.delete(`${END_POINTS.MEDICAL_PACKAGE.DELETE(id)}`);
    },
  },
};
