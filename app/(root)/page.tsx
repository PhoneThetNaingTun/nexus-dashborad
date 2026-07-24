import { DashboardHome } from "@/features/dashboard/components/dashboard-home";
import { api } from "@/lib/api/api";
import { formatDate } from "@/lib/date";

export default async function Home() {
  const { data } = await api.dashboard.summary({ date: formatDate(new Date()) });

  return <DashboardHome summary={data} />;
}
