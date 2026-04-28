"use client";

import { Calendar as CalendarIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatDate } from "@/lib/date";
import { useState } from "react";

interface DatePickerProps {
  date?: string;
  onDateChange?: (date: string) => void;
}

export function DatePicker({ date, onDateChange }: DatePickerProps) {
  const [value, setValue] = useState<Date | undefined>(
    date ? new Date(date) : undefined,
  );

  const handleDateChange = (newDate: Date | undefined) => {
    if (!newDate) return;
    setValue(newDate);

    const formatted = formatDate(newDate);

    if (onDateChange) {
      onDateChange(formatted);
    }
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className="w-70 justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
        >
          <CalendarIcon />
          {date ? formatDate(date) : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          captionLayout="dropdown"
          onSelect={handleDateChange}
          required
        />
      </PopoverContent>
      {date && (
        <Button
          variant="outline"
          size="icon"
          className="ml-2"
          onClick={() => {
            setValue(undefined);
            if (onDateChange) {
              onDateChange("");
            }
          }}
        >
          <XIcon />
        </Button>
      )}
    </Popover>
  );
}
