import type { Contestant } from "@/models/contestant";
import { LeaderboardContestantRopesFemale } from "./TopRopesFemaleColumn";
import React, { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/table";
import { getAllContestants } from "@/services/contestantService";

export const TopRopesFemale: React.FC = () => {
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
    <div className="container mx-auto w-90">
      <DataTable
        columns={LeaderboardContestantRopesFemale}
        data={rows.slice(0, 5)}
      />
    </div>
  );
};
