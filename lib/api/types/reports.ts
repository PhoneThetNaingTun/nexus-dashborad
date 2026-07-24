export interface ReportAggregation {
  data: { date: string; revenue: number; count: number }[];
}

export interface SalesReport {
  overall: {
    revenue: number;
    count: number;
  };
  daily: ReportAggregation;
  monthly: ReportAggregation;
  yearly: ReportAggregation;
}
