import type { Route } from "@/models/route";
import { gradeList, colorList, routeColumns } from "./RouteColumns";
import React, { useContext, useEffect, useState } from "react";
import { DataTable } from "@/components/ui/table";
import { Plus, SquareArrowUp, SquareArrowDown,ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createRoute, getRoutesById } from "@/services/routeService";
import { CompContext } from "@/components/layout/layout";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
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
import { Spinner } from "@/components/ui/loadingWheel";
import { Arrow } from "@radix-ui/react-select";

interface tableProps {
  isEdit: boolean;
  toggleEditing: (isSelected: boolean) => void;
}

export const RoutesTable: React.FC<tableProps> = ({ toggleEditing }) => {
  const [routes, setRoutes] = useState<Route[]>([]); // original copy of routes, update when user saves any edits
  const [rows, setRows] = useState<Route[]>([]); // rows for data table
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedGrade, setSelectedGrade] = useState<string>("");
  const [selectedRouteColor, setSelectedRouteColor] = useState<string>("");
  const [scoreValue, setScoreValue] = useState<string>("");
  const [open, setOpen] = React.useState(false); //calendar open state
  const [date, setDate] = React.useState<string>("");
  const ctx = useContext(CompContext);
  //clickable header
  const [showRouteForm, setShowAddForm] = useState<boolean>(false);

  useEffect(() => {
    loadData();
  }, [ctx?.comp.id]);

  const loadData = () => {
    setLoading(true);
    if (ctx?.comp.id) {
      getRoutesById(ctx?.comp.id)
        .then((res) => {
          setRoutes(res);
          setRows(res);
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleShowAddForm = () => {
    setShowAddForm(!showRouteForm);
  };

  const handleUpdate = (rowIndex: number, columnId: string, value: unknown) => {
    setRows((old) => {
      const temp = old.map((row, index) =>
        index === rowIndex ? { ...row, [columnId]: value } : row
      );

      return temp;
    });
  };
  //adding a row function
  const addRow = () => {
    if (!selectedGrade || !selectedRouteColor || !date || !scoreValue) {
      alert("Please select a grade and color");
      return;
    }

    const newRow: Route = {
      id: 0,
      name: "",
      number: 0,
      grade: selectedGrade,
      color: selectedRouteColor,
      competition_id: ctx?.comp.id || 0,
      point_value: scoreValue ? parseInt(scoreValue) : 0,
      set_date: date,
    };

    if (ctx?.comp.id) {
      newRow.competition_id = ctx.comp.id;
    }

    createRoute(newRow).then(() => {
      loadData();
    });
  };

  const loadContent = () => {
    return (
      <>
        <span
          className={`flex items-center text-2xl font-medium px-4 py-2  cursor-pointer gap-2 hover:bg-neutral-200 `}
          onClick={handleShowAddForm}
        >
          Routes
          <div className="flex items-center">
            {showRouteForm ? <SquareArrowUp /> : <SquareArrowDown />}
          </div>
        </span>

        <div
          className="overflow-hidden transition-all duration-500 ease-in-out"
          style={{
            maxHeight: showRouteForm ? "100px" : "0",
          }}
        >
          <div className="  rounded-sm bg-white shadow-xl ">
            <div className="flex space-x-2 p-5 bg-neutral-200">
              {/* ADD ROW COMPOENENT GOES HERE */}
              <Select onValueChange={(value) => setSelectedGrade(value)}>
                <SelectTrigger className="w-[90px] bg-blue-800 text-white">
                  <SelectValue placeholder="Grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Grade</SelectLabel>
                    {gradeList.map((grade, index) => (
                      <SelectItem key={index} value={grade}>
                        {grade}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select onValueChange={(value) => setSelectedRouteColor(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Colors</SelectLabel>
                    {colorList.map((color, index) => (
                      <SelectItem key={index} value={color}>
                        {color}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {/* Score*/}
              <Input
                placeholder="ex.150"
                type="number"
                value={scoreValue}
                onChange={(e) => setScoreValue(e.target.value)}
                className="w-40 bg-neutral-100 border-neutral-200"
              />
              {/* Date*/}
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
                    selected={new Date(date)}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      setDate(format(date as Date, "MM/dd/yyyy"));
                      setOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
              {/* Add Button */}
              <Button size="sm" onClick={addRow}>
                <Plus />
              </Button>
            </div>
          </div>
        </div>

        {/* Routes Table */}
        <div className="mx-auto pt-5 w-full">
          <DataTable
            columns={routeColumns}
            data={rows}
            onUpdate={handleUpdate}
            onDeselect={(rowIndex, isSave) => {
              // edit row was just canceled, revert row back to pre-edit state

              setRows((old) =>
                old.map((row, index) =>
                  // search rows until we find rowIndex
                  index === rowIndex && !isSave ? routes[index] : row
                )
              );

              toggleEditing(false);
            }}
            onDelete={() => {
              loadData();
            }}
            onRowClick={(row) => {
              // setCurrentRoute(row);
              toggleEditing(true);
            }}
            emptyMessage="Please select a competition."
          />
        </div>
      </>
    );
  };

  return <div>{loadContent()}</div>;
};
