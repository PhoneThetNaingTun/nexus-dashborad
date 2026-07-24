"use client";

import React, { useEffect, useState } from "react";
import { SalesReport } from "@/lib/api/types/reports";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { CalendarDays } from "lucide-react";
import { formatCurrency } from "@/lib/currency-formatter";
import { api } from "@/lib/api/api";

export default function ReportsPage() {
  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    return date.toISOString().split("T")[0];
  });
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState<SalesReport | null>(null);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const response = await api.report.getReports({ startDate, endDate });
      setReportData(response.data);
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sales Reports</h1>
          <p className="text-muted-foreground">
            Overview of medical package and consultation revenue.
          </p>
        </div>
        <div className="flex flex-wrap items-end gap-4 bg-background p-4 rounded-lg border shadow-sm">
          <div className="grid gap-2">
            <Label htmlFor="start-date" className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4" /> Start Date
            </Label>
            <Input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="end-date" className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4" /> End Date
            </Label>
            <Input
              id="end-date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <Button onClick={fetchReports} disabled={loading}>
            {loading ? <Spinner className="mr-2" /> : "Update Report"}
          </Button>
        </div>
      </div>

      {loading && !reportData ? (
        <div className="flex items-center justify-center h-64">
          <Spinner />
        </div>
      ) : (
        reportData && (
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatCurrency(reportData.overall.revenue)}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Sales
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {reportData.overall.count}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Daily Trend */}
            <Card className="p-6">
              <CardHeader>
                <CardTitle>Daily Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={reportData.daily?.data || []}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="date"
                      tickFormatter={(str) =>
                        new Date(str).toLocaleDateString()
                      }
                      fontSize={12}
                    />
                    <YAxis
                      width={80}
                      tickFormatter={(value) => `${formatCurrency(value)}`}
                      fontSize={12}
                    />
                    <Tooltip
                      formatter={(value: number) => formatCurrency(value)}
                    />
                    <Legend />
                    <Bar
                      dataKey="revenue"
                      fill="#2563eb"
                      name="Revenue"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="count"
                      fill="#94a3b8"
                      name="Sales Count"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Monthly & Yearly */}
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="p-6">
                <CardHeader>
                  <CardTitle>Monthly Revenue</CardTitle>
                </CardHeader>
                <CardContent className="h-[350px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={reportData.monthly?.data || []}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis
                        dataKey="date"
                        tickFormatter={(str) =>
                          new Date(str).toLocaleDateString("en-US", {
                            month: "short",
                          })
                        }
                        fontSize={12}
                      />
                      <YAxis
                        width={80}
                        tickFormatter={(value) => `${formatCurrency(value)}`}
                        fontSize={12}
                      />
                      <Tooltip
                        formatter={(value: number) => formatCurrency(value)}
                      />
                      <Bar
                        dataKey="revenue"
                        fill="#2563eb"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card className="p-6">
                <CardHeader>
                  <CardTitle>Yearly Revenue</CardTitle>
                </CardHeader>
                <CardContent className="h-[350px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={reportData.yearly.data || []}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis
                        dataKey="date"
                        tickFormatter={(str) =>
                          new Date(str).getFullYear().toString()
                        }
                        fontSize={12}
                      />
                      <YAxis
                        width={80}
                        tickFormatter={(value) => `${formatCurrency(value)}`}
                        fontSize={12}
                      />
                      <Tooltip
                        formatter={(value: number) => formatCurrency(value)}
                      />
                      <Bar
                        dataKey="revenue"
                        fill="#2563eb"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        )
      )}
    </div>
  );
}
