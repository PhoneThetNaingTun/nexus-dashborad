import { usePaginationSearchParams } from "@/lib/nuqs/searchParams";

export const NumberCellColumn = ({ index }: { index: number }) => {
  const [{ pageIndex }] = usePaginationSearchParams();
  return <p>{index + 1 + pageIndex * 10}</p>;
};
