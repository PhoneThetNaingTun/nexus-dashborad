import { Skeleton } from "../ui/skeleton";

export const DataTableSkeleton = () => {
  return (
    <div className="w-full bg-background p-5  mt-10">
      <div className="flex justify-between items-center my-3 w-full overflow-scroll no-scrollbar">
        <div className="w-40">
          <Skeleton className="w-full h-8" />
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="w-24 h-8" />
          <Skeleton className="w-24 h-8" />
        </div>
      </div>

      <Skeleton className="w-full h-100" />
    </div>
  );
};
