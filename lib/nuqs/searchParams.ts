import { debounce, Options, useQueryStates } from "nuqs";
import {
  appointmentParsers,
  appointmentUrlKeys,
  brandParsers,
  brandUrlKey,
  categoryParsers,
  categoryUrlKey,
  doctorParsers,
  doctorTypeParsers,
  doctorTypeUrlKeys,
  doctorUrlKey,
  medicalPackageItemParsers,
  medicalPackageItemUrlKey,
  medicalPackageParsers,
  medicalPackageUrlKey,
  medicineParsers,
  medicineUrlKey,
  paginationParsers,
  paginationUrlKeys,
  scheduleParsers,
  scheduleUrlKey,
  searchParsers,
  searchUrlKey,
} from "./loaderParams";

const paramOptions: Options = {
  limitUrlUpdates: debounce(500),
  shallow: false,
} as const;

// Pagination Params

export const usePaginationSearchParams = () => {
  return useQueryStates(paginationParsers, {
    urlKeys: paginationUrlKeys,
    ...paramOptions,
  });
};

// Search Params

export const useSearchSearchParams = () => {
  return useQueryStates(searchParsers, {
    urlKeys: searchUrlKey,
    ...paramOptions,
  });
};

// Doctor Type Params

export const useDoctorTypeSearchParams = () => {
  return useQueryStates(doctorTypeParsers, {
    urlKeys: doctorTypeUrlKeys,
    ...paramOptions,
  });
};

// Brand

export const useBrandSearchParams = () => {
  return useQueryStates(brandParsers, {
    urlKeys: brandUrlKey,
    ...paramOptions,
  });
};

// Category

export const useCategorySearchParams = () => {
  return useQueryStates(categoryParsers, {
    urlKeys: categoryUrlKey,
    ...paramOptions,
  });
};

// Medicine
export const useMedicineSearchParams = () => {
  return useQueryStates(medicineParsers, {
    urlKeys: medicineUrlKey,
    ...paramOptions,
  });
};

// Doctor
export const useDoctorSearchParams = () => {
  return useQueryStates(doctorParsers, {
    urlKeys: doctorUrlKey,
    ...paramOptions,
  });
};

// Schedule
export const useScheduleSearchParams = () => {
  return useQueryStates(scheduleParsers, {
    urlKeys: scheduleUrlKey,
    ...paramOptions,
  });
};

// Appointment

export const useAppointmentSearchParams = () => {
  return useQueryStates(appointmentParsers, {
    urlKeys: appointmentUrlKeys,
    ...paramOptions,
  });
};

// Medical package item

export const useMedicalPackageItemSearchParams = () => {
  return useQueryStates(medicalPackageItemParsers, {
    urlKeys: medicalPackageItemUrlKey,
    ...paramOptions,
  });
};

// Medical package

export const useMedicalPackageSearchParams = () => {
  return useQueryStates(medicalPackageParsers, {
    urlKeys: medicalPackageUrlKey,
    ...paramOptions,
  });
};
