import { Role, Roles } from "@/lib/api/types/user";
import {
  ClipboardClock,
  ClipboardPlusIcon,
  FileChartPieIcon,
  PillIcon,
  Stethoscope,
} from "lucide-react";

const AppointmentRoute = {
  title: "Appointments",
  url: "#",
  icon: ClipboardClock,

  items: [
    {
      title: "Appointments",
      url: "/appointments",
    },
  ],
};
const TodayAppointmentRoute = {
  title: "Today's Appointments",
  url: "/today-appointments",
  icon: FileChartPieIcon,
};
const DoctorRoute = {
  title: "Doctors",
  url: "#",
  icon: Stethoscope,

  items: [
    {
      title: "Doctors",
      url: "/doctors",
    },
    {
      title: "Doctor-types",
      url: "/doctor-type",
    },
  ],
};
const MedicineRoute = {
  title: "Medicines",
  url: "#",
  icon: PillIcon,

  items: [
    {
      title: "Medicines",
      url: "/medicines",
    },
    {
      title: "Brands",
      url: "/brands",
    },
    {
      title: "Categories",
      url: "/categories",
    },
  ],
};

const MedicalPackageRoute = {
  title: "Medical Packages",
  url: "#",
  icon: ClipboardPlusIcon,

  items: [
    {
      title: "Medical Packages",
      url: "/medical-packages",
    },
    {
      title: "Medical Package item",
      url: "/medical-package-items",
    },
  ],
};

const adminRoutes = {
  general: [TodayAppointmentRoute],
  navMain: [AppointmentRoute, DoctorRoute, MedicineRoute, MedicalPackageRoute],
};

const doctorRoutes = {
  general: [TodayAppointmentRoute],
  navMain: [AppointmentRoute],
};

export const getRoutes = (role: Role) => {
  if (role === Roles.DOCTOR) {
    return doctorRoutes;
  }
  return adminRoutes;
};
