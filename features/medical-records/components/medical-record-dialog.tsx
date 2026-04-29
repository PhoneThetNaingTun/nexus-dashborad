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
import { MedicalRecord } from "@/lib/api/types/medical-record";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MedicalRecordSchema } from "../schema/medical-records.schema";
import { MedicalRecordForm } from "./medical-record-form";

interface MedicalRecordProps {
  data?: MedicalRecord;
  mode: "create" | "update";
  showTriggerButton?: boolean;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  requireData: {
    patientId: string;
    doctorId: string;
    appointmentId: string;
  };
  buttonText?: string;
}

export const MedicalRecordDialog = ({
  data,
  mode,
  showTriggerButton = false,
  open,
  setOpen,
  requireData,
  buttonText,
}: MedicalRecordProps) => {
  const router = useRouter();

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleSubmit = async (value: MedicalRecordSchema) => {
    setSubmitting(true);
    try {
      if (mode === "create") {
        await api.medicalRecord.create({
          ...value,
          ...requireData,
        });
      } else if (mode === "update" && data) {
        if (!data.id) {
          ShowToast({
            title: "Error",
            description: "Id not found",

            type: "error",
          });
          return;
        }
        await api.medicalRecord.update(data.id, value);
      }

      ShowToast({
        title: "Success",
        description:
          mode === "create" ? "Created successfully" : "Updated successfully",
        type: "success",
      });
      setOpen && setOpen(false);
      showTriggerButton && setOpenDialog(false);
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
    <Dialog
      open={showTriggerButton ? openDialog : open}
      onOpenChange={showTriggerButton ? setOpenDialog : setOpen}
    >
      {showTriggerButton && (
        <DialogTrigger asChild>
          <Button>
            {" "}
            {buttonText ? buttonText : mode === "create" ? "Create" : "Update"}
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="w-full max-w-xl!">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Create" : "Update"}</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <MedicalRecordForm
            onSubmit={handleSubmit}
            initialValue={data}
            disabled={submitting}
          />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};
