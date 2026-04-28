import {
  createLoader,
  parseAsIndex,
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs/server";
import { APPOINTMENT_STATUS } from "../api/types/appointment";

// Pagination

export const paginationParsers = {
  pageIndex: parseAsIndex.withDefault(0),
  pageSize: parseAsInteger.withDefault(10),
};
export const paginationUrlKeys = {
  pageIndex: "page",
  pageSize: "pageSize",
};

// Search

export const searchParsers = {
  search: parseAsString.withDefault(""),
};

export const searchUrlKey = {
  search: "s",
};

// Date
export const dateParsers = {
  date: parseAsString.withDefault(""),
};
export const dateUrlKey = {
  date: "date",
};

// Doctor Types
export const doctorTypeParsers = {
  ...paginationParsers,
  ...searchParsers,
};

export const doctorTypeUrlKeys = {
  ...paginationUrlKeys,
  ...searchUrlKey,
};
export const loadDoctorTypeSearchParams = createLoader(doctorTypeParsers, {
  urlKeys: doctorTypeUrlKeys,
});

// Brands
export const brandParsers = {
  ...paginationParsers,
  ...searchParsers,
};

export const brandUrlKey = {
  ...paginationUrlKeys,
  ...searchUrlKey,
};
export const loadBrandSearchParams = createLoader(brandParsers, {
  urlKeys: brandUrlKey,
});

// Categories
export const categoryParsers = {
  ...paginationParsers,
  ...searchParsers,
};

export const categoryUrlKey = {
  ...paginationUrlKeys,
  ...searchUrlKey,
};
export const loadCategorySearchParams = createLoader(categoryParsers, {
  urlKeys: categoryUrlKey,
});

//  Medicines
export const medicineParsers = {
  ...paginationParsers,
  ...searchParsers,
};

export const medicineUrlKey = {
  ...paginationUrlKeys,
  ...searchUrlKey,
};
export const loadMedicineSearchParams = createLoader(medicineParsers, {
  urlKeys: medicineUrlKey,
});

//  Doctors
export const doctorParsers = {
  ...paginationParsers,
  ...searchParsers,
};

export const doctorUrlKey = {
  ...paginationUrlKeys,
  ...searchUrlKey,
};
export const loadDoctorSearchParams = createLoader(doctorParsers, {
  urlKeys: doctorUrlKey,
});

//  Schedule
export const scheduleParsers = {
  ...paginationParsers,
  ...searchParsers,
};

export const scheduleUrlKey = {
  ...paginationUrlKeys,
  ...searchUrlKey,
};
export const loadScheduleSearchParams = createLoader(scheduleParsers, {
  urlKeys: scheduleUrlKey,
});

// Appointments

export const appointmentStatusParsers = {
  status: parseAsStringLiteral(Object.values(APPOINTMENT_STATUS)),
};

export const appointmentParsers = {
  ...paginationParsers,
  ...searchParsers,
  ...appointmentStatusParsers,
  ...dateParsers,
};

export const appointmentUrlKeys = {
  ...paginationUrlKeys,
  ...searchUrlKey,
  ...dateUrlKey,
  status: "status",
};

export const loadAppointmentSearchParams = createLoader(appointmentParsers, {
  urlKeys: appointmentUrlKeys,
});
