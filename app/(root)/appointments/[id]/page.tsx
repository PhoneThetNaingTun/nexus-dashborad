import { InfoGrid } from "@/components/common/Info-grid";
import { NotFoundData } from "@/components/common/not-found-data";
import { Profile } from "@/components/common/profile";
import { AppointmentActionButton } from "@/features/appointments/components/appointment-action-buttons";
import { MedicalRecordDialog } from "@/features/medical-records/components/medical-record-dialog";
import { MedicalRecordView } from "@/features/medical-records/components/medical-record-view";
import { PrescriptionView } from "@/features/prescriptions/components/prescription-view";
import { api } from "@/lib/api/api";
import { formatCurrency } from "@/lib/currency-formatter";
import {
  formatAppointmentTimeToDate,
  formatAppointmentTimeToTime,
} from "@/lib/date";
import { FileExclamationPointIcon } from "lucide-react";

const AppointmentDetail = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { data } = await api.appointment.getById(id);
  if (!data) {
    return <NotFoundData />;
  }

  return (
    <div>
      <div className="mt-3 space-y-3 flex flex-col lg:flex-row lg:items-start gap-5">
        <div>
          <Profile user={data.patient} className="w-60 h-60" />
        </div>
        <div className="flex-1 space-y-5">
          <div className="flex justify-end my-4">
            <AppointmentActionButton data={data} />
          </div>
          <InfoGrid
            title="Appointment Info"
            columns={3}
            options={[
              {
                label: "Date",
                value: formatAppointmentTimeToDate(data.appointmentTime),
              },
              {
                label: "Time",
                value: formatAppointmentTimeToTime(data.appointmentTime),
              },
              { label: "Status", value: data.status },
            ]}
          />
          <InfoGrid
            title="Patient Info"
            columns={2}
            options={[
              { label: "Name", value: data.patient.name },
              { label: "E-mail", value: data.patient.email },
            ]}
          />
          <InfoGrid
            title="Doctor Info"
            columns={3}
            options={[
              { label: "Name", value: data.doctor.user.name },
              { label: "E-mail", value: data.doctor.user.email },
              { label: "Specialization", value: data.doctor.type?.name },
              { label: "Fee", value: formatCurrency(data.doctor.fee) },
              { label: "Bio", value: data.doctor.bio },
            ]}
          />

          {data.medicalRecord ? (
            <div>
              <MedicalRecordView data={data.medicalRecord} />
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex justify-end">
                <MedicalRecordDialog
                  mode="create"
                  showTriggerButton
                  requireData={{
                    appointmentId: data.id,
                    doctorId: data.doctorId,
                    patientId: data.patientId,
                  }}
                  buttonText="Add Medical Record"
                />
              </div>
              <div className="bg-card h-52 rounded-md flex justify-center items-center">
                <p className="text-muted-foreground flex items-center gap-3">
                  <FileExclamationPointIcon />
                  No Medical Record
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      {data.medicalRecord?.prescriptions && (
        <PrescriptionView
          data={data.medicalRecord.prescriptions}
          medicalRecordId={data.medicalRecord.id}
        />
      )}
    </div>
  );
};

export default AppointmentDetail;
