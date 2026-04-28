"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Spinner } from "../ui/spinner";

const RefreshAccessToken = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const refreshTokenProvider = async (): Promise<string | null> => {
      try {
        let url = "/api/auth/refresh";
        const res = await fetch(url, {
          credentials: "include",
          method: "POST",
        });
        if (!res.ok) {
          router.replace("/login");
          return null;
        }
        const data = await res.json();

        router.refresh();

        return data.access_token;
      } catch {
        return null;
      } finally {
        setIsLoading(false);
      }
    };
    refreshTokenProvider();
  }, []);

  if (isLoading) {
    <div className="flex justify-center items-center h-screen">
      <Spinner />
    </div>;
  }
  return null;
};

export default RefreshAccessToken;
