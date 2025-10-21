import React, { useState, useEffect } from "react";

import { DataTable } from "@/components/ui/table";
import { LeaderboardContestants } from "./TopClimbersColumns";
import { getAllContestants } from "@/services/contestantService";
import type { Contestant } from "@/models/contestant";
export const TopClimbers: React.FC = () => {
  const [contestants, setContestants] = useState<Contestant[]>([]);
  const [rows, setRows] = useState<Contestant[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    getAllContestants()
      .then((res: Contestant[]) => {
        setContestants(res);
        setRows(res);
      })
      .catch(console.error);
  };

  return (
    <div className="container mx-auto py-10 w-90">
      <div className="gap-6 flex flex-col">
        {/* Top Male TopRopes */}
        <div className="flex flex-row gap-10">
            <div className="width-screen max-w-screen">
          <DataTable columns={LeaderboardContestants} data={rows.slice(0, 5)} />
          </div>
          <DataTable columns={LeaderboardContestants} data={rows.slice(0, 5)} />
        </div>
        <div className="flex flex-row gap-10">
          <DataTable columns={LeaderboardContestants} data={rows.slice(0, 5)} />
          <DataTable columns={LeaderboardContestants} data={rows.slice(0, 5)} />
        </div>
      </div>
    </div>
  );
};
