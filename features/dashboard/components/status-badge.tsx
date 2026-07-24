import { Badge } from "@/components/ui/badge";
import { AppointmentStatus } from "@/lib/api/types/appointment";

const STATUS_LABELS: Record<AppointmentStatus, string> = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  CANCELLED: "Cancelled",
  CHECKING: "Checking",
  COMPLETED: "Completed",
};

const STATUS_VARIANTS = {
  PENDING: "warning",
  CONFIRMED: "success",
  CANCELLED: "destructive",
  CHECKING: "default",
  COMPLETED: "secondary",
} as const;

export function StatusBadge({ status }: { status: AppointmentStatus }) {
  return (
    <Badge variant={STATUS_VARIANTS[status]}>{STATUS_LABELS[status]}</Badge>
  );
}
