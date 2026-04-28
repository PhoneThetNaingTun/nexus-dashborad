import { TrashIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Spinner } from "../ui/spinner";

interface DeleteDialogProps {
  showTriggerButton?: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  onDelete: () => void;
  disabled?: boolean;
}

export const DeleteDialog = ({
  showTriggerButton,
  open,
  setOpen,
  onDelete,
  disabled = false,
}: DeleteDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {showTriggerButton && (
        <DialogTrigger asChild>
          <Button variant="destructive">
            <TrashIcon className="w-5 h-5" />
          </Button>
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete?</DialogTitle>
          <DialogDescription>This action cannot be undone!</DialogDescription>
        </DialogHeader>
        <DialogBody>
          <div className="flex items-center justify-between">
            <Button
              variant={"destructive"}
              onClick={onDelete}
              disabled={disabled}
            >
              {disabled ? <Spinner /> : "Delete"}
            </Button>
            <DialogClose asChild>
              <Button variant={"ghost"} disabled={disabled}>
                Cancel
              </Button>
            </DialogClose>
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};
