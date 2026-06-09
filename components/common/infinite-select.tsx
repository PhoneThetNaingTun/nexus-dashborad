"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useEffect, useRef } from "react";

interface Option {
  value: string;
  label?: string;
}

interface InfiniteSelectProps {
  value?: string;
  onValueChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  disabled?: boolean;
  nonExistingValue?: Option;
}

export const InfiniteSelect = ({
  value,
  onValueChange,
  options,
  placeholder = "Select an option",
  loading,
  hasMore,
  onLoadMore,
  nonExistingValue,
  disabled = false,
}: InfiniteSelectProps) => {
  const observerTarget = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      { threshold: 1.0 },
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, loading, onLoadMore]);

  const shouldShowNonExisting =
    nonExistingValue &&
    !options.some((o) => o.value === nonExistingValue.value);

  return (
    <Select value={value} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="max-h-[250px] overflow-y-auto">
        {shouldShowNonExisting && (
          <SelectItem value={nonExistingValue.value}>
            {nonExistingValue.label}
          </SelectItem>
        )}
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}

        {/* Sentinel element for infinite scrolling tracking */}
        <div ref={observerTarget} className="h-1" />

        {loading && (
          <div className="flex items-center justify-center p-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            Loading more...
          </div>
        )}

        {!hasMore && options.length > 0 && (
          <div className="p-2 text-center text-xs text-muted-foreground">
            End of list
          </div>
        )}

        {options.length === 0 && !loading && (
          <div className="p-4 text-center text-sm text-muted-foreground">
            No options found
          </div>
        )}
      </SelectContent>
    </Select>
  );
};
