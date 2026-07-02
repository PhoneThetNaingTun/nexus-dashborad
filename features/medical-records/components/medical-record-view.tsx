import { InfoGrid } from "@/components/common/Info-grid";
import { MedicalRecord } from "@/lib/api/types/medical-record";
import { formatDate } from "@/lib/date";
import { MedicalRecordDialog } from "./medical-record-dialog";

interface MedicalRecordViewProps {
  data: MedicalRecord;
}

export const MedicalRecordView = ({ data }: MedicalRecordViewProps) => {
  // to do add medical record view and medical record form
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <MedicalRecordDialog
          mode="update"
          showTriggerButton
          data={data}
          requireData={{
            patientId: data.patientId,
            doctorId: data.doctorId,
            appointmentId: data.appointmentId,
          }}
        />
      </div>
      <InfoGrid
        title="Medical Record"
        columns={2}
        options={[
          { label: "Diagnosis", value: data.diagnosis },
          { label: "Symptoms", value: data.symptoms },
          { label: "Weight", value: `${data.weight?.toString()} kg` },
          { label: "Blood Pressure", value: data.bloodPressure },
          {
            label: "Follow Up Date",
            value: data.followUpDate && formatDate(data.followUpDate),
          },
          { label: "Advice", value: data.advice },
        ]}
      />
    </div>
  );
};
