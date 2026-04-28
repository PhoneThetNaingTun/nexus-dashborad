"use client";
import { ShowToast } from "@/components/common/show-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { api } from "@/lib/api/api";
import { getErrorMessage } from "@/lib/api/error";
import { Schedule } from "@/lib/api/types/schedule";
import { PencilIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { ScheduleSchema } from "../schema/scheduleSchema";
import { ScheduleForm } from "./schedule-form";

interface ScheduleDialogProps {
  data?: Schedule;
  mode: "create" | "update";
  showTriggerButton?: boolean;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

export const ScheduleDialog = ({
  data,
  mode,
  showTriggerButton = false,
  open,
  setOpen,
}: ScheduleDialogProps) => {
  const router = useRouter();
  const { id } = useParams();

  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = async (value: ScheduleSchema) => {
    setSubmitting(true);
    try {
      if (mode === "create") {
        await api.schedule.create(id as string, value);
      } else if (mode === "update" && data) {
        if (!data.id) {
          ShowToast({
            title: "Error",
            description: "Id not found",

            type: "error",
          });
          return;
        }
        await api.schedule.update(data.id, value);
      }

      ShowToast({
        title: "Success",
        description:
          mode === "create" ? "Created successfully" : "Updated successfully",
        type: "success",
      });
      setOpen && setOpen(false);

      router.refresh();
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      ShowToast({
        title: "Error",
        description: errorMessage,
        type: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {showTriggerButton && (
        <DialogTrigger asChild>
          <Button>
            {" "}
            <PencilIcon /> {mode === "create" ? "Create" : "Edit"}
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="w-full max-w-xl!">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Create" : "Update"}</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <ScheduleForm
            onSubmit={handleSubmit}
            initialValue={data}
            disabled={submitting}
          />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};
