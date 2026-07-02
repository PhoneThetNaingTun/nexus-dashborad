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
import { Appointment } from "@/lib/api/types/appointment";
import { EllipsisVerticalIcon, EyeIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface AppointmentCellActionProps {
  data: Appointment;
}

export const AppointmentCellAction = ({ data }: AppointmentCellActionProps) => {
  //   const [showDialog, setShowDialog] = useState<boolean>(false);
  //   const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  //   const [deleteLoading, setDeleteLoading] = useState(false);
  const router = useRouter();

  //   const handleDelete = async () => {
  //     setDeleteLoading(true);
  //     try {
  //       await api.medicine.delete(data.id);

  //       ShowToast({
  //         title: "Success",
  //         description: "Deleted successfully",
  //         type: "success",
  //       });
  //       setShowDeleteDialog(false);
  //       router.refresh();
  //     } catch (error) {
  //       const errorMessage = getErrorMessage(error);
  //       ShowToast({
  //         title: "Error",
  //         description: errorMessage,
  //         type: "error",
  //       });
  //     } finally {
  //       setDeleteLoading(false);
  //     }
  //   };

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
            <DropdownMenuItem
              onClick={() => router.push(`/appointments/${data.id}`)}
            >
              <EyeIcon /> View
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
