import { InfoGrid } from "@/components/common/Info-grid";
import { NotFoundData } from "@/components/common/not-found-data";
import { Profile } from "@/components/common/profile";
import { AppointmentActionButton } from "@/features/appointments/components/appointment-action-buttons";
import { api } from "@/lib/api/api";
import { formatCurrency } from "@/lib/currency-formatter";
import {
  formatAppointmentTimeToDate,
  formatAppointmentTimeToTime,
} from "@/lib/date";

const AppointmentDetail = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { data } = await api.appointment.getById(id);
  console.log(data);
  if (!data) {
    return <NotFoundData />;
  }

  return (
    <div className="mt-3 space-y-3 flex flex-col lg:flex-row lg:items-start gap-5">
      <div>
        <Profile user={data.patient} className="w-60 h-60" />
      </div>
      <div className="flex-1 space-y-5">
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
        <div className="flex justify-end">
          <AppointmentActionButton data={data} />
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetail;
