import { api } from "@/lib/api/api";
import { DoctorType } from "@/lib/api/types/doctor-type";
import { useEffect, useState } from "react";

export const useGetDoctorTypeList = ({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) => {
  const [data, setData] = useState<DoctorType[]>([]);

  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await api.doctor_type.list({
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
