"use client";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { DashboardHourlyPoint } from "@/lib/api/types/dashboard";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartConfig = {
  appointments: {
    label: "Appointments",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

function buildChartData(hourly: DashboardHourlyPoint[]) {
  const countsByHour = new Map(hourly.map((point) => [point.hour, point.count]));

  return Array.from({ length: 11 }, (_, index) => {
    const hour = index + 8;
    return {
      hour,
      label:
        hour === 12
          ? "12 PM"
          : hour > 12
            ? `${hour - 12} PM`
            : `${hour} AM`,
      appointments: countsByHour.get(hour) ?? 0,
    };
  });
}

export function DailyOverviewChart({
  hourly,
}: {
  hourly: DashboardHourlyPoint[];
}) {
  const data = buildChartData(hourly);

  return (
    <ChartContainer config={chartConfig} className="h-60 w-full aspect-auto">
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
        <defs>
          <linearGradient id="appointments-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-appointments)" stopOpacity={0.2} />
            <stop offset="100%" stopColor="var(--color-appointments)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="label"
          axisLine={false}
          tickLine={false}
          interval={1}
          tickMargin={10}
        />
        <YAxis allowDecimals={false} axisLine={false} tickLine={false} width={42} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Area
          dataKey="appointments"
          type="monotone"
          fill="url(#appointments-fill)"
          stroke="var(--color-appointments)"
          strokeWidth={2}
          dot={{ fill: "var(--color-appointments)", r: 3 }}
          activeDot={{ r: 5 }}
        />
      </AreaChart>
    </ChartContainer>
  );
}
