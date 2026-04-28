import { InfoGrid } from "@/components/common/Info-grid";
import { NotFoundData } from "@/components/common/not-found-data";
import { DoctorDialog } from "@/features/doctors/components/doctor-dialog";
import { ScheduleView } from "@/features/doctors/schedules/components/shcedule-view";
import { api } from "@/lib/api/api";
import { formatCurrency } from "@/lib/currency-formatter";
import { loadScheduleSearchParams } from "@/lib/nuqs/loaderParams";
import { SearchParams } from "nuqs/server";

const DoctorDetail = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<SearchParams>;
}) => {
  const { id } = await params;
  const { data } = await api.doctor.getById(id);
  const { search, pageIndex, pageSize } =
    await loadScheduleSearchParams(searchParams);
  const { data: ScheduleData, pagination } = await api.schedule.list({
    doctorId: id,
    params: { page: pageIndex, pageSize, search },
  });

  if (!data) {
    return <NotFoundData />;
  }

  return (
    <div className="mt-3 space-y-3">
      <div className="flex justify-end">
        <DoctorDialog mode="update" showTriggerButton data={data} />
      </div>
      <InfoGrid
        title="Personal Info"
        columns={3}
        options={[
          { label: "Name", value: data.user.name },
          { label: "E-mail", value: data.user.email },
          { label: "Specialization", value: data.type?.name },
          { label: "Fee", value: formatCurrency(data.fee) },
          { label: "Bio", value: data.bio },
        ]}
      />
      <div>
        <h2 className="font-semibold text-xl mt-2">Schedules</h2>
        <ScheduleView data={ScheduleData} pagination={pagination} />
      </div>
    </div>
  );
};

export default DoctorDetail;
