"use client";
import { ApproveDialog } from "@/components/common/approve-dialog";
import { RejectDialog } from "@/components/common/reject-dialog";
import { ShowToast } from "@/components/common/show-toast";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { api } from "@/lib/api/api";
import { getErrorMessage } from "@/lib/api/error";
import {
  Appointment,
  APPOINTMENT_STATUS,
  AppointmentStatus,
} from "@/lib/api/types/appointment";
import {
  CheckCircleIcon,
  CheckIcon,
  LoaderIcon,
  XCircleIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface AppointmentActionButtonsProps {
  data: Appointment;
}

export const AppointmentActionButton = ({
  data,
}: AppointmentActionButtonsProps) => {
  const router = useRouter();
  const status = data.status;
  const id = data.id;
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);

  const handleUpdateStatus = async (status: AppointmentStatus) => {
    setLoading(true);
    try {
      await api.appointment.updateStatus(id, {
        status: status,
      });
      ShowToast({
        title: "Success",
        description: "Updated successfully",
        type: "success",
      });

      router.refresh();
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      ShowToast({
        title: "Error",
        description: errorMessage,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  if (status === APPOINTMENT_STATUS.PENDING) {
    const handleClick = async (status: "approve" | "reject") => {
      setLoading(true);
      try {
        if (status === "approve") {
          await api.appointment.approve({
            id,
          });
          ShowToast({
            title: "Success",
            description: "Approved successfully",
            type: "success",
          });
        } else if (status === "reject") {
          await api.appointment.reject({
            id,
          });

          ShowToast({
            title: "Success",
            description: "Rejected successfully",
            type: "success",
          });
        }
        setOpen(false);
        router.refresh();
      } catch (error) {
        const errorMessage = getErrorMessage(error);
        ShowToast({
          title: "Error",
          description: errorMessage,
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="flex items-center gap-4">
        <Button variant={"destructive"} onClick={() => setRejectOpen(true)}>
          Reject
        </Button>
        <Button onClick={() => setOpen(true)}>Confirm</Button>
        <ApproveDialog
          open={open}
          setOpen={setOpen}
          onApprove={() => {
            handleClick("approve");
          }}
          disabled={loading}
        />
        <RejectDialog
          open={rejectOpen}
          setOpen={setRejectOpen}
          onReject={() => {
            handleClick("reject");
          }}
          disabled={loading}
        />
      </div>
    );
  }

  if (status === APPOINTMENT_STATUS.CONFIRMED) {
    return (
      <div className="flex items-center gap-3">
        <div className="bg-success/40 text-success w-fit flex items-center gap-2 px-2 py-1 rounded-md">
          <CheckCircleIcon className="w-5 h-5" /> <span>Confirmed</span>
        </div>
        <Button
          variant="warning"
          disabled={loading}
          onClick={() => handleUpdateStatus("CHECKING")}
        >
          <LoaderIcon />
          Make this appointment checking
        </Button>
      </div>
    );
  }
  if (status === APPOINTMENT_STATUS.CANCELLED) {
    return (
      <div className="bg-destructive/40 text-destructive w-fit flex items-center gap-2 px-2 py-1 rounded-md">
        <XCircleIcon className="w-5 h-5" /> <span>Cancelled</span>
      </div>
    );
  }
  if (status === APPOINTMENT_STATUS.CHECKING) {
    return (
      <div className="flex items-center gap-3">
        <div className="bg-warning text-warning-foreground w-fit flex items-center gap-2 px-2 py-1 rounded-md">
          <Spinner className="w-5 h-5" /> <span>Checking this appointment</span>
        </div>
        <Button
          variant="success"
          disabled={loading}
          onClick={() => handleUpdateStatus("COMPLETED")}
        >
          <CheckIcon />
          Make this appointment as completed
        </Button>
      </div>
    );
  }
  if (status === APPOINTMENT_STATUS.COMPLETED) {
    return (
      <div className="bg-success text-success-foreground w-fit flex items-center gap-2 px-2 py-1 rounded-md">
        <CheckCircleIcon className="w-5 h-5" /> <span>Completed</span>
      </div>
    );
  }
  return <div>AppointmentActinButton</div>;
};
