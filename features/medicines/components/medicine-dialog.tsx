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
import { Medicine } from "@/lib/api/types/medicine";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MedicineSchema } from "../schema/medicineSchema";
import { MedicineForm } from "./medicine-form";

interface MedicineDialogProps {
  data?: Medicine;
  mode: "create" | "update";
  showTriggerButton?: boolean;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

export const MedicineDialog = ({
  data,
  mode,
  showTriggerButton = false,
  open,
  setOpen,
}: MedicineDialogProps) => {
  const router = useRouter();

  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = async (value: MedicineSchema) => {
    setSubmitting(true);
    try {
      if (mode === "create") {
        await api.medicine.create(value);
      } else if (mode === "update" && data) {
        if (!data.id) {
          ShowToast({
            title: "Error",
            description: "Id not found",

            type: "error",
          });
          return;
        }
        await api.medicine.update(data.id, value);
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
        <DialogTrigger>
          <Button>{mode === "create" ? "Create" : "Update"}</Button>
        </DialogTrigger>
      )}
      <DialogContent className="w-full max-w-xl!">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Create" : "Update"}</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <MedicineForm
            onSubmit={handleSubmit}
            initialValue={data}
            disabled={submitting}
          />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};
