import type { Route } from "@/models/route";
import { routeColumns } from "./RouteColumns";
import React, { useContext, useEffect, useState } from "react";
import { DataRow, DataTable } from "@/components/ui/table";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getRoutesById, saveRoutes } from "@/services/routeService";
import { CompContext } from "@/components/layout/layout";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { se } from "date-fns/locale";
import { setDate } from "date-fns";
interface tableProps {
  isEdit: boolean;
  toggleEditing: (isSelected: boolean) => void;
}

export const RoutesTable: React.FC<tableProps> = ({ toggleEditing }) => {
  const [routes, setRoutes] = useState<Route[]>([]); // original copy of routes, update when user saves any edits
  const [rows, setRows] = useState<Route[]>([]); // rows for data table
  const [currentRoute, setCurrentRoute] = useState<Route>(); // orginal copy of currently selected route
  const [selectedGrade, setSelectedGrade] = useState<string>("");
  const [selectedRouteColor, setSelectedRouteColor] = useState<string>("");
  const [scoreValue, setScoreValue] = useState<string>("");
const [date, setDate] = React.useState<Date | "">(new Date())
  const ctx = useContext(CompContext);

  const temp = routeColumns.slice().splice(1);

  useEffect(() => {
    loadData();
  }, [ctx?.comp.id]);

  const loadData = () => {
    if (ctx?.comp.id) {
      getRoutesById(ctx?.comp.id)
        .then((res) => {
          setRoutes(res);
          setRows(res);
        })
        .catch(console.error);
    }
  };

  const handleUpdate = (rowIndex: number, columnId: string, value: unknown) => {
    setRows((old) => {
      const temp = old.map((row, index) =>
        index === rowIndex ? { ...row, [columnId]: value } : row
      );

      return temp;
    });
  };

  const addRow = () => {
    const blankRow: Route = {
      id: 0,
      name: "",
      number: 0,
      grade: selectedGrade,
      color: selectedRouteColor,
      competition_id: ctx?.comp.id || 0,
      point_value: 0,
      set_date:  date ? date.toISOString().split('T')[0] : "",
    };

    setRows([...rows, blankRow]);
    if (ctx?.comp.id) {
      blankRow.competition_id = ctx.comp.id;
    }
    console.log("ADD ROW", blankRow);
    /* 
   saveRoutes([...rows, blankRow]).then((res) => {
      loadData();
      
    });
   */
  };

  return (
    <>
      <span className="text-2xl font-medium">Routes</span>

      <div className="px-5 border-1 rounded-sm bg-white shadow-xl ">
        <div className="flex space-x-2 pt-5">
          {/* ADD ROW COMPOENENT GOES HERE */}
          <Select onValueChange={(value) => setSelectedGrade(value)}>
            <SelectTrigger className="w-[90px]">
              <SelectValue placeholder="Grade" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Grade</SelectLabel>
                <SelectItem value="v1">v1</SelectItem>
                <SelectItem value="v2">v2</SelectItem>
                <SelectItem value="v3">v3</SelectItem>
                <SelectItem value="v4">v4</SelectItem>
                <SelectItem value="v5">v5</SelectItem>
                <SelectItem value="v6">v6</SelectItem>
                <SelectItem value="v7">v7</SelectItem>
                <SelectItem value="v8">v8</SelectItem>
                <SelectItem value="v9">v9</SelectItem>
                <SelectItem value="v10">v10+</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => setSelectedRouteColor(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Color" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="red">Red</SelectItem>
                <SelectItem value="blue">Blue</SelectItem>
                <SelectItem value="green">Green</SelectItem>
                <SelectItem value="yellow">Yellow</SelectItem>
                <SelectItem value="pink">Pink</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {/* Score*/}
          <Input placeholder="ex.150" type="number" value={scoreValue} onChange={(e)=>setScoreValue(e.target.value)}className="w-40" />
          {/* Date*/}
          <Calendar 
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-lg border"

          />
          {/* Add Button */}
          <Button size="sm" onClick={addRow}>
            <Plus />
          </Button>
        </div>

        <div className="mx-auto pt-5 w-175">
          <DataTable
            columns={routeColumns}
            data={rows}
            onUpdate={handleUpdate}
            onDeselect={(rowIndex, isSave) => {
              setRows((old) =>
                old.map((row, index) =>
                  index === rowIndex && !isSave ? routes[index] : row
                )
              );

              toggleEditing(false);
            }}
            onRowClick={(row) => {
              setCurrentRoute(row);
              toggleEditing(true);
            }}
            emptyMessage="Please select a competition."
          />
        </div>
      </div>
    </>
  );
};
