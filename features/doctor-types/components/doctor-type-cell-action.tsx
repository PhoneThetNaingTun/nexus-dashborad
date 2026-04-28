import { DeleteDialog } from "@/components/common/delete-dialog";
import { ShowToast } from "@/components/common/show-toast";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { api } from "@/lib/api/api";
import { getErrorMessage } from "@/lib/api/error";
import { DoctorType } from "@/lib/api/types/doctor-type";
import { EllipsisVerticalIcon, PencilIcon, TrashIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DoctorTypeDialog } from "./doctor-type-dialog";

interface DoctorTypeCellActionProps {
  data: DoctorType;
}

export const DoctorTypeCellAction = ({ data }: DoctorTypeCellActionProps) => {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await api.doctor_type.delete(data.id);

      ShowToast({
        title: "Success",
        description: "Deleted successfully",
        type: "success",
      });
      setShowDeleteDialog(false);
      router.refresh();
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      ShowToast({
        title: "Error",
        description: errorMessage,
        type: "error",
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"outline"}>
            <EllipsisVerticalIcon className="w-10 h-10" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Action</DropdownMenuLabel>
          <Separator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setShowDialog(true)}>
              <PencilIcon /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setShowDeleteDialog(true)}>
              <TrashIcon /> Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <DoctorTypeDialog
        mode="update"
        open={showDialog}
        setOpen={setShowDialog}
        data={data}
      />
      <DeleteDialog
        open={showDeleteDialog}
        setOpen={setShowDeleteDialog}
        onDelete={handleDelete}
        disabled={deleteLoading}
      />
    </>
  );
};
