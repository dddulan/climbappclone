import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ChevronDownIcon } from "lucide-react";
import type { Table } from "@tanstack/react-table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import React from "react";

interface dateSelectCell<TData> {
  rowIndex: number;
  columnName: string;
  value: string;
  table: Table<TData>;
  isEdit: boolean;
}

export function DateSelectCell<TData>({
  rowIndex,
  value,
  table,
  isEdit,
  columnName,
}: dateSelectCell<TData>) {
  const [open, setOpen] = React.useState(false);

  if (!isEdit) {
    return <span>{String(value)}</span>;
  } else {
    return (
      <div className="w-22">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="date"
              id="date"
              className="w-30 justify-between font-normal !h-8"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {value ? format(value, "MM/dd/yyyy") : "Select date"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={new Date(value)}
              captionLayout="dropdown"
              onSelect={(date) => {
                table.options.meta?.updateData(
                  rowIndex,
                  columnName,
                  format(date as Date, "MM/dd/yyyy")
                );
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  }
}
