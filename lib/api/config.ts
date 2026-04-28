export const END_POINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    ME: "/auth/me",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
  },
  DOCTOR_TYPE: {
    LIST: "/doctor-types/list",
    CREATE: "/doctor-types/create",
    UPDATE: (id: string) => `/doctor-types/${id}`,
    DELETE: (id: string) => `/doctor-types/${id}`,
  },
  BRAND: {
    LIST: "/brands/list",
    CREATE: "/brands/create",
    UPDATE: (id: string) => `/brands/${id}`,
    DELETE: (id: string) => `/brands/${id}`,
  },
  CATEGORY: {
    LIST: "/categories/list",
    CREATE: "/categories/create",
    UPDATE: (id: string) => `/categories/${id}`,
    DELETE: (id: string) => `/categories/${id}`,
  },
  MEDICINE: {
    LIST: "/medicines/list",
    CREATE: "/medicines/create",
    UPDATE: (id: string) => `/medicines/${id}`,
    DELETE: (id: string) => `/medicines/${id}`,
  },
  DOCTOR: {
    LIST: "/doctors/list",
    CREATE: "/doctors/create",
    GET: (id: string) => `/doctors/${id}`,
    UPDATE: (id: string) => `/doctors/${id}`,
    DELETE: (id: string) => `/doctors/${id}`,
  },
  SCHEDULE: {
    LIST: (id: string) => `/schedules/list/${id}`,
    CREATE: (id: string) => `/schedules/create/${id}`,
    GET: (id: string) => `/schedules/${id}`,
    UPDATE: (id: string) => `/schedules/${id}`,
    DELETE: (id: string) => `/schedules/${id}`,
  },
  APPOINTMENT: {
    LIST: `/admin/appointments/list`,
    GET: (id: string) => `/admin/appointments/${id}`,
    APPROVE: `/admin/appointments/approve`,
    REJECT: `/admin/appointments/reject`,
  },
  MEDICAL_RECORD: {
    CREATE: `/medical-records/create`,
    UPDATE: (id: string) => `/medical-records/${id}`,
  },
  PRESCRIPTION: {
    CREATE: `/prescriptions/create`,
    UPDATE: (id: string) => `/prescriptions/${id}`,
    DELETE: (id: string) => `/prescriptions/${id}`,
  },
};
