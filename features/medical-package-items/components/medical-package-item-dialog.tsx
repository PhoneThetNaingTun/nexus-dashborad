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
import { MedicalPackageItem } from "@/lib/api/types/medical-package-item";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MedicalPackageItemSchema } from "../schema/medical-package-item.schema";
import { MedicalPackageItemForm } from "./medical-package-item-form";

interface MedicalPackageItemDialogProps {
  data?: MedicalPackageItem;
  mode: "create" | "update";
  showTriggerButton?: boolean;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

export const MedicalPackageItemDialog = ({
  data,
  mode,
  showTriggerButton = false,
  open,
  setOpen,
}: MedicalPackageItemDialogProps) => {
  const router = useRouter();

  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = async (value: MedicalPackageItemSchema) => {
    setSubmitting(true);
    try {
      if (mode === "create") {
        await api.medicalPackageItem.create(value);
      } else if (mode === "update" && data) {
        if (!data.id) {
          ShowToast({
            title: "Error",
            description: "Id not found",

            type: "error",
          });
          return;
        }
        await api.medicalPackageItem.update(data.id, value);
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
          <MedicalPackageItemForm
            onSubmit={handleSubmit}
            initialValue={data}
            disabled={submitting}
          />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};
