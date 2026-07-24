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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DashboardAppointment } from "@/lib/api/types/dashboard";
import { formatAppointmentTimeToTime } from "@/lib/date";
import { CalendarXIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { StatusBadge } from "./status-badge";

export function AppointmentQueue({
  appointments,
  isDoctor,
}: {
  appointments: DashboardAppointment[];
  isDoctor: boolean;
}) {
  const selectedId =
    appointments.find((appointment) => appointment.status === "CHECKING")?.id ??
    appointments[0]?.id;

  return (
    <Card className="min-w-0 gap-0 py-0">
      <CardHeader className="border-b py-5">
        <CardTitle>Today&apos;s appointment queue</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {appointments.length === 0 ? (
          <Empty className="min-h-80">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <CalendarXIcon />
              </EmptyMedia>
              <EmptyTitle>No appointments scheduled</EmptyTitle>
              <EmptyDescription>
                Today&apos;s appointment queue is clear.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <>
            <div className="hidden md:block">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="pl-5">Time</TableHead>
                    <TableHead>Patient</TableHead>
                    {!isDoctor ? <TableHead>Doctor</TableHead> : null}
                    <TableHead>Status</TableHead>
                    <TableHead className="pr-5 text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map((appointment) => (
                    <TableRow
                      key={appointment.id}
                      data-state={appointment.id === selectedId ? "selected" : undefined}
                      className="relative h-14 has-[td:first-child]:border-l-4 has-[td:first-child]:border-l-transparent data-[state=selected]:has-[td:first-child]:border-l-primary"
                    >
                      <TableCell className="pl-5 font-medium">
                        {formatAppointmentTimeToTime(appointment.appointmentTime)}
                      </TableCell>
                      <TableCell>{appointment.patientName}</TableCell>
                      {!isDoctor ? (
                        <TableCell>{appointment.doctorName}</TableCell>
                      ) : null}
                      <TableCell>
                        <StatusBadge status={appointment.status} />
                      </TableCell>
                      <TableCell className="pr-5 text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/appointments/${appointment.id}`}>
                            View
                            <ChevronRightIcon data-icon="inline-end" />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex flex-col md:hidden">
              {appointments.map((appointment) => (
                <Link
                  key={appointment.id}
                  href={`/appointments/${appointment.id}`}
                  className="flex items-center gap-3 border-b p-4 last:border-b-0 hover:bg-muted/50"
                >
                  <div className="min-w-20 text-sm font-medium">
                    {formatAppointmentTimeToTime(appointment.appointmentTime)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {appointment.patientName}
                    </p>
                    {!isDoctor ? (
                      <p className="truncate text-xs text-muted-foreground">
                        {appointment.doctorName}
                      </p>
                    ) : null}
                  </div>
                  <StatusBadge status={appointment.status} />
                  <ChevronRightIcon className="size-4 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </>
        )}
      </CardContent>
      <CardFooter className="justify-start bg-transparent px-5 py-3">
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
