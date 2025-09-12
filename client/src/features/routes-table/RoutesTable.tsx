import type { Route } from "@/models/route";
import { routeColumns } from "./RouteColumns";
import React, { useContext, useEffect, useState } from "react";
import { DataRow, DataTable } from "@/components/ui/table";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getRoutesById } from "@/services/routeService";
import { CompContext } from "@/components/layout/layout";

interface tableProps {
  isEdit: boolean;
  toggleEditing: (isSelected: boolean) => void;
}

export const RoutesTable: React.FC<tableProps> = ({ toggleEditing }) => {
  const [routes, setRoutes] = useState<Route[]>([]); // original copy of routes, update when user saves any edits
  const [rows, setRows] = useState<Route[]>([]); // rows for data table
  const [currentRoute, setCurrentRoute] = useState<Route>(); // orginal copy of currently selected route
  const ctx = useContext(CompContext);

  var temp = routeColumns.slice().splice(1);

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
      grade: "",
      color: "",
      competition_id: 0,
      point_value: 0,
      set_date: "",
    };

    setRows([...rows, blankRow]);
  };

  return (
    <>
      <span className="text-2xl font-medium">Routes</span>

      <div className="px-5 border-1 rounded-sm">
        <div className="flex space-x-2 pt-5">
          <Button size="sm" onClick={addRow}>
            <Plus />
          </Button>

          {/* ADD ROW COMPOENENT GOES HERE */}
          <span>ADD ROW COMP HERE</span>
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
