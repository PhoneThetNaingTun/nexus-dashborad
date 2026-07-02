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
import { Prescription } from "@/lib/api/types/prescription";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PrescriptionSchema } from "../schema/prescription.schema";
import { PrescriptionForm } from "./prescription-form";

interface PrescriptionDialogProps {
  data?: Prescription;
  mode: "create" | "update";
  buttonText?: string;
  showTriggerButton?: boolean;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  requireData: {
    medicalRecordId: string;
  };
}

export const PrescriptionDialog = ({
  data,
  mode,
  buttonText,
  showTriggerButton = false,
  open,
  setOpen,
  requireData,
}: PrescriptionDialogProps) => {
  const router = useRouter();

  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = async (value: PrescriptionSchema) => {
    setSubmitting(true);
    try {
      if (mode === "create") {
        await api.prescription.create({ ...value, ...requireData });
      } else if (mode === "update" && data) {
        if (!data.id) {
          ShowToast({
            title: "Error",
            description: "Id not found",

            type: "error",
          });
          return;
        }
        await api.prescription.update(data.id, { ...value, ...requireData });
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
            {buttonText ? buttonText : mode === "create" ? "Create" : "Update"}
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="w-full max-w-xl!">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Create" : "Update"}</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <PrescriptionForm
            onSubmit={handleSubmit}
            initialValue={data}
            disabled={submitting}
          />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};
