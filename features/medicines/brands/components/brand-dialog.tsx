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
import { Brand } from "@/lib/api/types/brand";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BrandSchema } from "../schema/brand-schema";
import { BrandForm } from "./brand-form";

interface BrandDialogProps {
  data?: Brand;
  mode: "create" | "update";
  showTriggerButton?: boolean;
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

export const BrandDialog = ({
  data,
  mode,
  showTriggerButton = false,
  open,
  setOpen,
}: BrandDialogProps) => {
  const router = useRouter();

  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = async (value: BrandSchema) => {
    setSubmitting(true);
    try {
      if (mode === "create") {
        await api.brand.create(value);
      } else if (mode === "update" && data) {
        if (!data.id) {
          ShowToast({
            title: "Error",
            description: "Id not found",

            type: "error",
          });
          return;
        }
        await api.brand.update(data.id, value);
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
          <BrandForm
            onSubmit={handleSubmit}
            initialValue={data}
            disabled={submitting}
          />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};
