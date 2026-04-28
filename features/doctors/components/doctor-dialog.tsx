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
import { Doctor } from "@/lib/api/types/doctor";
import { PencilIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DoctorSchema } from "../schema/doctorSchema";
import { DoctorForm } from "./doctor-form";

interface DoctorDialogProps {
  data?: Doctor;
  mode: "create" | "update";
  showTriggerButton?: boolean;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

export const DoctorDialog = ({
  data,
  mode,
  showTriggerButton = false,
  open,
  setOpen,
}: DoctorDialogProps) => {
  const router = useRouter();

  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = async (value: DoctorSchema) => {
    setSubmitting(true);
    try {
      if (mode === "create") {
        await api.doctor.create(value);
      } else if (mode === "update" && data) {
        if (!data.id) {
          ShowToast({
            title: "Error",
            description: "Id not found",

            type: "error",
          });
          return;
        }
        await api.doctor.update(data.id, value);
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
          <DoctorForm
            onSubmit={handleSubmit}
            initialValue={data}
            disabled={submitting}
            showPassword={mode === "create"}
          />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};
