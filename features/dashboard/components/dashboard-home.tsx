import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Separator } from "@/components/ui/separator";
import { DashboardSummary } from "@/lib/api/types/dashboard";
import { formatCurrency } from "@/lib/currency-formatter";
import { formatAppointmentTimeToTime } from "@/lib/date";
import {
  BarChart3Icon,
  CalendarCheck2Icon,
  CalendarClockIcon,
  CheckCircle2Icon,
  ChevronRightIcon,
  CircleDollarSignIcon,
  ClipboardListIcon,
  Clock3Icon,
  FileClockIcon,
  PackageOpenIcon,
  StethoscopeIcon,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { AppointmentQueue } from "./appointment-queue";
import { DailyOverviewChart } from "./daily-overview-chart";
import { StatusBadge } from "./status-badge";

function SummaryMetric({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: LucideIcon;
  label: string;
  value: string | number;
  tone: "primary" | "warning" | "success" | "info";
}) {
  const toneClasses = {
    primary: "bg-primary/10 text-primary",
    warning: "bg-warning/20 text-warning",
    success: "bg-success/20 text-success",
    info: "bg-info/15 text-info",
  };

  return (
    <div className="flex min-w-0 items-center gap-4 px-5 py-5">
      <div
        className={cn(
          "flex size-12 shrink-0 items-center justify-center rounded-lg",
          toneClasses[tone]
        )}
      >
        <Icon className="size-5" strokeWidth={2} />
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm text-muted-foreground">{label}</p>
        <p className="mt-1 truncate text-2xl font-semibold tracking-tight">
          {value}
        </p>
      </div>
    </div>
  );
}

function SummaryRail({ summary }: { summary: DashboardSummary }) {
  const isAdmin = summary.role === "ADMIN";
  const nextAppointment = summary.appointments.upcoming[0];

  return (
    <Card className="grid gap-0 py-0 sm:grid-cols-2 xl:grid-cols-4">
      <SummaryMetric
        icon={CalendarCheck2Icon}
        label="Today's appointments"
        value={summary.appointments.total}
        tone="primary"
      />
      <div className="border-t sm:border-l sm:border-t-0 xl:border-l">
        <SummaryMetric
          icon={Clock3Icon}
          label="Waiting"
          value={summary.appointments.waiting}
          tone="warning"
        />
      </div>
      <div className="border-t xl:border-l xl:border-t-0">
        <SummaryMetric
          icon={CheckCircle2Icon}
          label="Completed"
          value={summary.appointments.completed}
          tone="success"
        />
      </div>
      <div className="border-t sm:border-l xl:border-l xl:border-t-0">
        <SummaryMetric
          icon={isAdmin ? CircleDollarSignIcon : CalendarClockIcon}
          label={isAdmin ? "Today's revenue" : "Next appointment"}
          value={
            isAdmin
              ? formatCurrency(summary.admin.revenue)
              : nextAppointment
                ? formatAppointmentTimeToTime(nextAppointment.appointmentTime)
                : "No more today"
          }
          tone={isAdmin ? "primary" : "info"}
        />
      </div>
    </Card>
  );
}

const STATUS_META = [
  { key: "COMPLETED", label: "Completed", className: "bg-success" },
  { key: "CHECKING", label: "Checking / In progress", className: "bg-primary" },
  { key: "PENDING", label: "Pending", className: "bg-warning" },
  { key: "CONFIRMED", label: "Confirmed", className: "bg-info" },
] as const;

function DailyOverview({ summary }: { summary: DashboardSummary }) {
  const total = summary.appointments.total;

  return (
    <Card className="gap-0 py-0">
      <CardHeader className="border-b py-5">
        <CardTitle>Daily overview</CardTitle>
        <p className="text-sm text-muted-foreground">Appointments by hour</p>
      </CardHeader>
      <CardContent className="px-4 pt-5">
        <DailyOverviewChart hourly={summary.appointments.hourly} />
      </CardContent>
      <CardFooter className="flex-col items-stretch gap-3 bg-transparent px-5 py-4">
        <p className="text-sm font-medium">Status breakdown</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {STATUS_META.map((status) => {
            const count = summary.appointments.breakdown[status.key];
            const percent = total === 0 ? 0 : Math.round((count / total) * 100);

            return (
              <div key={status.key} className="flex items-center gap-2 text-sm">
                <span className={cn("size-2 rounded-full", status.className)} />
                <span className="min-w-0 flex-1 truncate text-muted-foreground">
                  {status.label}
                </span>
                <span className="font-medium tabular-nums">
                  {count} ({percent}%)
                </span>
              </div>
            );
          })}
        </div>
      </CardFooter>
    </Card>
  );
}

function QuickActions({ isAdmin }: { isAdmin: boolean }) {
  const actions = isAdmin
    ? [
        {
          label: "Review pending appointments",
          href: "/appointments?status=PENDING",
          icon: FileClockIcon,
        },
        { label: "Manage doctors", href: "/doctors", icon: StethoscopeIcon },
        { label: "Open reports", href: "/reports", icon: BarChart3Icon },
      ]
    : [
        {
          label: "Review pending appointments",
          href: "/appointments?status=PENDING",
          icon: FileClockIcon,
        },
        {
          label: "Open today's queue",
          href: "/today-appointments",
          icon: ClipboardListIcon,
        },
        {
          label: "View all appointments",
          href: "/appointments",
          icon: CalendarCheck2Icon,
        },
      ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick actions</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-3 sm:grid-cols-3">
        {actions.map((action) => (
          <Button
            key={action.label}
            variant="outline"
            className="h-auto min-h-20 justify-start whitespace-normal px-4 py-3 text-left"
            asChild
          >
            <Link href={action.href}>
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <action.icon />
              </span>
              <span className="flex-1">{action.label}</span>
              <ChevronRightIcon data-icon="inline-end" />
            </Link>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}

function AdminRecentSales({ summary }: { summary: DashboardSummary & { role: "ADMIN" } }) {
  const sales = summary.admin.recentPackageSales;

  return (
    <Card className="gap-0 py-0">
      <CardHeader className="border-b py-5">
        <CardTitle>Recent package sales</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {sales.length === 0 ? (
          <Empty className="min-h-44">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <PackageOpenIcon />
              </EmptyMedia>
              <EmptyTitle>No package sales today</EmptyTitle>
              <EmptyDescription>New package sales will appear here.</EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <div className="flex flex-col">
            {sales.map((sale, index) => (
              <div key={sale.id}>
                <div className="grid grid-cols-[1fr_auto] gap-3 px-5 py-3 text-sm sm:grid-cols-[1.3fr_1fr_auto_auto]">
                  <span className="truncate font-medium">{sale.packageName}</span>
                  <span className="hidden truncate text-muted-foreground sm:block">
                    {sale.patientName}
                  </span>
                  <span className="hidden text-muted-foreground sm:block">
                    {formatAppointmentTimeToTime(sale.purchaseDate)}
                  </span>
                  <span className="font-medium tabular-nums">
                    {formatCurrency(sale.purchasedPrice)}
                  </span>
                </div>
                {index < sales.length - 1 ? <Separator /> : null}
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="bg-transparent px-5 py-3">
        <Button variant="link" size="sm" asChild>
          <Link href="/medical-package-history">
            View all sales
            <ChevronRightIcon data-icon="inline-end" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

function DoctorNextPatients({ summary }: { summary: DashboardSummary & { role: "DOCTOR" } }) {
  const upcoming = summary.appointments.upcoming;

  return (
    <Card className="gap-0 py-0">
      <CardHeader className="border-b py-5">
        <CardTitle>Next patients</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {upcoming.length === 0 ? (
          <Empty className="min-h-44">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <CalendarCheck2Icon />
              </EmptyMedia>
              <EmptyTitle>No more patients today</EmptyTitle>
              <EmptyDescription>Your upcoming queue is clear.</EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <div className="flex flex-col">
            {upcoming.map((appointment, index) => (
              <div key={appointment.id}>
                <Link
                  href={`/appointments/${appointment.id}`}
                  className="grid grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-3 text-sm hover:bg-muted/50"
                >
                  <span className="font-medium tabular-nums">
                    {formatAppointmentTimeToTime(appointment.appointmentTime)}
                  </span>
                  <span className="truncate">{appointment.patientName}</span>
                  <StatusBadge status={appointment.status} />
                </Link>
                {index < upcoming.length - 1 ? <Separator /> : null}
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="bg-transparent px-5 py-3">
        <Button variant="link" size="sm" asChild>
          <Link href="/today-appointments">
            View full queue
            <ChevronRightIcon data-icon="inline-end" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export function DashboardHome({ summary }: { summary: DashboardSummary }) {
  const isAdmin = summary.role === "ADMIN";
  const displayName =
    !isAdmin && !/^dr\.?\s/i.test(summary.displayName)
      ? `Dr. ${summary.displayName}`
      : summary.displayName;

  return (
    <main className="flex w-full flex-col gap-5 p-1 sm:p-2 lg:p-3">
      <section className="flex flex-col gap-4 py-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Good morning, {displayName}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground sm:text-base">
            {isAdmin
              ? "Here’s what’s happening at Nexus Clinic today."
              : "Here’s your schedule at Nexus Clinic today."}
          </p>
        </div>
        <Button size="lg" asChild>
          <Link href="/today-appointments">
            <CalendarCheck2Icon data-icon="inline-start" />
            View today&apos;s appointments
            <ChevronRightIcon data-icon="inline-end" />
          </Link>
        </Button>
      </section>

      <SummaryRail summary={summary} />

      <section className="grid min-w-0 gap-5 xl:grid-cols-[1.08fr_0.92fr]">
        <AppointmentQueue
          appointments={summary.appointments.queue}
          isDoctor={!isAdmin}
        />
        <DailyOverview summary={summary} />
      </section>

      <section className="grid min-w-0 gap-5 xl:grid-cols-[1.08fr_0.92fr]">
        <QuickActions isAdmin={isAdmin} />
        {summary.role === "ADMIN" ? (
          <AdminRecentSales summary={summary} />
        ) : (
          <DoctorNextPatients summary={summary} />
        )}
      </section>
    </main>
  );
}
