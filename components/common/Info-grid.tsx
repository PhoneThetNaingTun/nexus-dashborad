import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";

interface InfoGridProps {
  options: Array<{ label: string; value?: string }>;
  title: string;
  columns?: 1 | 2 | 3 | 4 | 5 | 6 | 7;
}

const gridColsMap: Record<NonNullable<InfoGridProps["columns"]>, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  5: "lg:grid-cols-5",
  4: "lg:grid-cols-4",
  6: "lg:grid-cols-6",
  7: "lg:grid-cols-7",
};

export const InfoGrid = ({ options, title, columns = 3 }: InfoGridProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 className="text-xl font-semibold">{title}</h2>
        </CardTitle>
      </CardHeader>
      <Separator />
      <CardContent>
        <div className={`grid ${gridColsMap[columns]} gap-5`}>
          {options.map((option) => (
            <div key={option.value}>
              <p className="text-muted-foreground text-sm">{option.label}</p>
              <p className="text-base truncate" title={option?.value ?? "-"}>
                {option?.value ?? "-"}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
