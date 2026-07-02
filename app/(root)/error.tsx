"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HomeIcon, RefreshCcwIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();
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
          <div className="flex justify-center gap-5">
            <Button onClick={() => router.push("/")}>
              <HomeIcon /> Home
            </Button>
            <Button onClick={() => reset()} variant="outline">
              <RefreshCcwIcon /> Retry
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
