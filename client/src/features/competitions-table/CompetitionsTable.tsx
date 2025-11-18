import type { Competition } from "@/models/competition";
import { competitionColumns, competitionTypeList } from "./CompetitionColumns";
import React, { useContext, useEffect, useState } from "react";
import { DataTable } from "@/components/ui/table";
import {
  createCompetition,
  getAllCompetitions,
} from "@/services/competitionService";
import { CompContext } from "@/components/layout/layout";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDownIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface tableProps {
  isSelected: boolean;
  toggleEditing: (isSelected: boolean) => void;
  //onCompSelect: (selected: number) => void;
}

export const CompetitionsTable: React.FC<tableProps> = ({
  isSelected,
  //toggleEditing
  //onCompSelect,
}) => {
  const [competitions, setCompetitions] = useState<Competition[]>([]); // original copy of competitions, update when user saves any edits
  const [rows, setRows] = useState<Competition[]>([]); // rows for data table
  const [compType, setCompType] = useState<string>("");
  const [open, setOpen] = React.useState(false); //calendar open state
  const [date, setDate] = React.useState<string>("");
  const ctx = useContext(CompContext);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    console.log("LOOK ", ctx);

    getAllCompetitions()
      .then((res: Competition[]) => {
        setCompetitions(res);
        setRows(res);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleUpdate = (rowIndex: number, columnId: string, value: unknown) => {
    setRows((old) =>
      old.map((row, index) =>
        index === rowIndex ? { ...row, [columnId]: value } : row
      )
    );
  };

  const addRow = () => {
    console.log(date);
    console.log(compType);

    const newComp: Competition = {
      id: 0,
      date_of: date,
      type: compType,
    };

    createCompetition(newComp).then(() => {
      loadData();
    });
  };

  const loadContent = () => {
    if (loading) {
      return (
        <>
          <span className="text-2xl font-medium px-4 py-2 block border-1">
            Competitions
          </span>
          <div className="px-5 border-1 rounded-sm bg-white shadow-xl min-h-[200px] flex justify-center items-center">
            <div className="w-full pt-2 flex justify-center">
              <Spinner variant="default" className="w-8 h-8 text-primary" />
            </div>
          </div>
        </>
      );
    }
    return (
      <>
        <span className="text-2xl font-medium px-4 py-2 block border-1">
          Competitions
        </span>
        <div className="px-5 border-1 rounded-sm bg-white shadow-xl">
          <div className="flex space-x-2 pt-5">
            {/* Date */}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date-picker"
                  className="w-32 justify-between font-normal"
                >
                  {date ? format(date, "MM/dd/yyyy") : "Select date"}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  // selected={new Date(date)}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    setDate(format(date as Date, "MM/dd/yyyy"));
                    setOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>

            {/* Type */}
            <Select onValueChange={(value) => setCompType(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                {competitionTypeList.map((type, index) => (
                  <SelectItem key={index} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Add Button */}
            <Button size="sm" onClick={addRow}>
              <Plus />
            </Button>
          </div>

          {/* Competitions Table */}
          <div className="w-full pt-2  min-h-[300px] ">
            <DataTable
              columns={competitionColumns}
              data={rows}
              onDeselect={(rowIndex, isSave) => {
                // edit row was just canceled, revert row back to pre-edit state
                setRows((old) =>
                  old.map((row, index) =>
                    // search rows until we find rowIndex
                    index === rowIndex && !isSave ? competitions[index] : row
                  )
                );

                // toggleEditing(false);
              }}
              onUpdate={handleUpdate}
              onDelete={() => {
                loadData();
              }}
              onRowClick={(row) => {
                if (!isSelected) {
                  ctx?.setComp(row);
                }
              }}
              isEdit={false}
              isRouteSelected={isSelected}
            />
          </div>
        </div>
      </>
    );
  };

  return <div>{loadContent()}</div>;
};
