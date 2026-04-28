import { api } from "@/lib/api/api";
import { Category } from "@/lib/api/types/category";
import { useEffect, useState } from "react";

export const useGetCategoryList = ({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) => {
  const [data, setData] = useState<Category[]>([]);

  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await api.category.list({
          params: { page, pageSize },
        });
        if (!isMounted) return;

        setData((prev) => [...prev, ...data]);
        setHasMore(data.length === pageSize);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [page, pageSize]);

  return { data, hasMore, loading };
};
