"use client";
import { toast } from "sonner";

interface ShowToastProps {
  title: string;
  description?: string;
  type: "success" | "error" | "warning" | "info";
}

export const ShowToast = ({ title, description, type }: ShowToastProps) => {
  const fn =
    type === "success"
      ? toast.success
      : type === "error"
        ? toast.error
        : type === "warning"
          ? toast.warning
          : toast.info;

  return fn(title, {
    description,
  });
};
