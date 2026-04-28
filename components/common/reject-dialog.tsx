import Image from "next/image";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Separator } from "../ui/separator";

interface RejectDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onReject: () => void;
  showTriggerButton?: boolean;
  description?: string;
  title?: string;
  content?: string;
  disabled?: boolean;
}

export const RejectDialog = ({
  open,
  setOpen,
  onReject,
  showTriggerButton = false,
  description,
  title = "Are you sure you want to reject?",
  content,
  disabled,
}: RejectDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {showTriggerButton && (
        <DialogTrigger asChild>
          <Button variant={"destructive"}>Reject</Button>
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <DialogBody>
          <div className="space-y-5">
            <div className="flex items-center justify-center">
              <Image
                src={"/images/reject.svg"}
                alt="reject"
                width={100}
                height={100}
                className="w-60 h-60 object-cover"
              />
            </div>
            <p>{content}</p>
          </div>
          <Separator className="my-2" />
          <div className="flex items-center justify-between">
            <Button
              onClick={onReject}
              variant={"destructive"}
              disabled={disabled}
            >
              Reject
            </Button>
            <Button
              onClick={() => setOpen(false)}
              variant={"ghost"}
              disabled={disabled}
            >
              Cancel
            </Button>
          </div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};
