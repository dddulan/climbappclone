import type { Route } from "@/models/route";
import { routeColumns } from "./RouteColumns";
import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/ui/table";

export const RoutesTable: React.FC = () => {
  const [routes, setRoutes] = useState<Route[]>([]); // original copy of routes, update when user saves any edits
  const [rows, setRows] = useState<Route[]>([]); // rows for data table
  const [isEdt, setIsEdit] = useState<boolean>(false);

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={routeColumns} data={rows} />
    </div>
  );
};