"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RefreshCcwIcon } from "lucide-react";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="w-full h-screen flex justify-center items-center ">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-9xl font-bold text-center gap-3">
            OOPOS!
          </CardTitle>
          <CardDescription className="text-center">
            Something went wrong!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-medium text-center">
            Error : <span>{error.message}</span>
          </p>
          <div className="flex justify-center">
            <Button onClick={() => reset()}>
              <RefreshCcwIcon /> Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
