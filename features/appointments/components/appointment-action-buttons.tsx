"use client";
import { ApproveDialog } from "@/components/common/approve-dialog";
import { RejectDialog } from "@/components/common/reject-dialog";
import { ShowToast } from "@/components/common/show-toast";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api/api";
import { getErrorMessage } from "@/lib/api/error";
import { Appointment } from "@/lib/api/types/appointment";
import { CheckCircleIcon, XCircleIcon } from "lucide-react";
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
  if (status === "PENDING") {
    const [open, setOpen] = useState(false);
    const [rejectOpen, setRejectOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleClick = async (status: "approve" | "reject") => {
      setLoading(true);
      try {
        if (status === "approve") {
          await api.appointment.approve({
            id: data.id,
          });
          ShowToast({
            title: "Success",
            description: "Approved successfully",
            type: "success",
          });
        } else if (status === "reject") {
          await api.appointment.reject({
            id: data.id,
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

  if (status === "CONFIRMED") {
    return (
      <div className="bg-success/40 text-success w-fit flex items-center gap-2 px-2 py-1 rounded-md">
        <CheckCircleIcon className="w-5 h-5" /> <span>Confirmed</span>
      </div>
    );
  }
  if (status === "CANCELLED") {
    return (
      <div className="bg-destructive/40 text-destructive w-fit flex items-center gap-2 px-2 py-1 rounded-md">
        <XCircleIcon className="w-5 h-5" /> <span>Cancelled</span>
      </div>
    );
  }
  return <div>AppointmentActinButton</div>;
};
