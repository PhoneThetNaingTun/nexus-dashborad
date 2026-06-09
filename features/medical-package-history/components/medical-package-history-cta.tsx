"use client";

import { ApproveDialog } from "@/components/common/approve-dialog";
import { InfiniteSelect } from "@/components/common/infinite-select";
import { RejectDialog } from "@/components/common/reject-dialog";
import { ShowToast } from "@/components/common/show-toast";
import { useGetDoctorList } from "@/features/doctors/hooks/useGetDoctorList";
import { MedicalRecordDialog } from "@/features/medical-records/components/medical-record-dialog";
import { api } from "@/lib/api/api";
import { getErrorMessage } from "@/lib/api/error";
import { PACKAGE_STATUS, UserPackage } from "@/lib/api/types/user-package";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

interface MedicalPackageHistoryCta {
  userPackage: UserPackage;
}

export const MedicalPackageHistoryCta = ({
  userPackage,
}: MedicalPackageHistoryCta) => {
  const [rejectOpen, setRejectOpen] = useState(false);
  const [approveOpen, setApproveOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [doctorId, setDoctorId] = useState<string | undefined>(
    userPackage.medicalRecord?.doctorId,
  );
  const [doctorPage, setDoctorPage] = useState(0);

  const {
    data: doctors,
    hasMore: doctorHasMore,
    loading: doctorLoading,
  } = useGetDoctorList({ page: doctorPage, pageSize: 10 });

  const doctorOptions = useMemo(() => {
    return doctors.map((doctor) => ({
      value: doctor.id,
      label: doctor.user.name,
    }));
  }, [doctors]);

  const handleLoadMoreDoctors = () => {
    if (doctorHasMore && !doctorLoading) {
      setDoctorPage((prev) => prev + 1);
    }
  };

  const doctor = userPackage.medicalRecord?.doctorId
    ? {
        label: userPackage.medicalRecord?.doctor?.user?.name,
        value: userPackage.medicalRecord?.doctorId,
      }
    : undefined;

  const handleReject = async () => {
    setLoading(true);
    try {
      await api.userPackage.reject(userPackage.id);

      ShowToast({
        title: "Success",
        description: "Rejected successfully",
        type: "success",
      });
      setRejectOpen(false);
      router.refresh();
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      ShowToast({
        title: "Error",
        description: errorMessage,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  const handleApprove = async () => {
    setLoading(true);
    try {
      await api.userPackage.confirm(userPackage.id);
      ShowToast({
        title: "Success",
        description: "Approved successfully",
        type: "success",
      });
      setApproveOpen(false);
      router.refresh();
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      ShowToast({
        title: "Error",
        description: errorMessage,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-end gap-5">
      {userPackage.status === PACKAGE_STATUS.PENDING && (
        <>
          <RejectDialog
            open={rejectOpen}
            setOpen={setRejectOpen}
            showTriggerButton
            title="Are you sure you want to reject this user's package?"
            onReject={handleReject}
            disabled={loading}
          />
          <ApproveDialog
            open={approveOpen}
            setOpen={setApproveOpen}
            showTriggerButton
            title="Are you sure you want to approve this user's package?"
            onApprove={handleApprove}
            disabled={loading}
          />
        </>
      )}
      <div className="flex items-center gap-4">
        <InfiniteSelect
          value={doctorId}
          onValueChange={setDoctorId}
          options={doctorOptions}
          placeholder="Select a Doctor"
          loading={doctorLoading}
          hasMore={doctorHasMore}
          onLoadMore={handleLoadMoreDoctors}
          nonExistingValue={doctor}
        />
        {userPackage.status === PACKAGE_STATUS.PURCHASED && (
          <MedicalRecordDialog
            userPackageId={userPackage.id}
            showTriggerButton
            mode="create"
            requireData={{
              patientId: userPackage.patientId,
              doctorId: doctorId!,
            }}
            disabled={!doctorId}
          />
        )}
      </div>
    </div>
  );
};
