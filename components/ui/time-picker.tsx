import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock } from "lucide-react";
import * as React from "react";

interface TimePickerProps {
  value?: string;
  onChange?: (time: string) => void;
  disabled?: boolean;
}

export const TimePicker = ({
  value = "00:00",
  onChange,
  disabled,
}: TimePickerProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const safeValue = value || "00:00";
  // Generate arrays for hours and minutes
  const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, "0"),
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, "0"),
  );

  const handleTimeChange = (type: "hour" | "minute", partValue: string) => {
    const [currentHour, currentMinute] = safeValue.split(":");
    const newTime =
      type === "hour"
        ? `${partValue}:${currentMinute}`
        : `${currentHour}:${partValue}`;

    onChange?.(newTime);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-30 justify-start text-left font-normal"
          disabled={disabled}
        >
          <Clock className="mr-2 h-4 w-4" />
          {value}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex h-64 divide-x">
          <ScrollArea className="w-20">
            <div className="flex flex-col p-2">
              {hours.map((hour) => (
                <Button
                  key={hour}
                  variant={value.split(":")[0] === hour ? "default" : "ghost"}
                  className="sm:w-full shrink-0 aspect-square"
                  onClick={() => handleTimeChange("hour", hour)}
                >
                  {hour}
                </Button>
              ))}
            </div>
          </ScrollArea>
          <ScrollArea className="w-20">
            <div className="flex flex-col p-2">
              {minutes.map((minute) => (
                <Button
                  key={minute}
                  variant={value.split(":")[1] === minute ? "default" : "ghost"}
                  className="sm:w-full shrink-0 aspect-square"
                  onClick={() => handleTimeChange("minute", minute)}
                >
                  {minute}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  );
};
