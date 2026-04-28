"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle } from "../ui/card";

export const NotFoundData = () => {
  const router = useRouter();
  return (
    <div className="flex justify-center mt-3">
      <Card className="w-xl p-10">
        <CardHeader>
          <CardTitle>
            <h1>Oops! We couldn't find the data you're looking for.</h1>
          </CardTitle>
        </CardHeader>

        <Button onClick={() => router.back()}>Go Back</Button>
      </Card>
    </div>
  );
};
