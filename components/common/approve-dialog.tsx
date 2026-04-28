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

interface ApproveDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onApprove: () => void;
  showTriggerButton?: boolean;
  description?: string;
  title?: string;
  content?: string;
  disabled?: boolean;
}

export const ApproveDialog = ({
  open,
  setOpen,
  onApprove,
  showTriggerButton = false,
  description,
  title = "Are you sure you want to approve?",
  content,
  disabled,
}: ApproveDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {showTriggerButton && (
        <DialogTrigger asChild>
          <Button>Approve</Button>
        </DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <DialogBody>
          <p>{content}</p>
          <div className="flex items-center justify-between">
            <Button onClick={onApprove} disabled={disabled}>
              Approve
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
