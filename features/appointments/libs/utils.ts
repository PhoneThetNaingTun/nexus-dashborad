import { AppointmentStatus } from "@/lib/api/types/appointment";
import {
  BanIcon,
  CheckCircleIcon,
  CheckIcon,
  ClipboardClockIcon,
  LoaderIcon,
} from "lucide-react";

export const getAppointmentBadgeVariant = (status: AppointmentStatus) => {
  switch (status) {
    case "PENDING":
      return "warning";
    case "COMPLETED":
      return "success";
    case "CANCELLED":
      return "destructive";
    case "CHECKING":
      return "warning";
    default:
      return "default";
  }
};

export const getAppointmentBadgeIcon = (status: AppointmentStatus) => {
  switch (status) {
    case "PENDING":
      return ClipboardClockIcon;
    case "COMPLETED":
      return CheckCircleIcon;
    case "CANCELLED":
      return BanIcon;
    case "CHECKING":
      return LoaderIcon;
    default:
      return CheckIcon;
  }
};
