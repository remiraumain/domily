"use client";

import * as React from "react";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import { format } from "date-fns";
import { PiCalendarBlank as CalendarIcon } from "react-icons/pi";
import { SelectSingleEventHandler } from "react-day-picker";

interface DatePickerProps {
  selected?: Date;
  onSelect?: SelectSingleEventHandler;
  minAge?: number;
}

export function DatePicker({
  selected,
  onSelect,
  minAge = 0,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !selected && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selected ? format(selected, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className=" w-auto p-0">
        <Calendar
          mode="single"
          captionLayout="dropdown-buttons"
          selected={selected}
          onSelect={onSelect}
          fromYear={new Date().getFullYear() - 100}
          toYear={new Date().getFullYear() - minAge}
        />
      </PopoverContent>
    </Popover>
  );
}
