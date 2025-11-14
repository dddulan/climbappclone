import React, { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/table";
import { ScoreColumn } from "./ScoreColumn";
import type { Score } from "@/models/score";
import { getContestantRoutes } from "@/services/contestantService";
interface ScoreTableProps {
  contestantId?: number;
  compId?: number;
}
export const ScoreTable: React.FC<ScoreTableProps> = ({compId,contestantId}) => {
  const [rows, setRows] = useState<Score[]>([]);
  //const { comp } = useCompetition();
  useEffect(() => {
    if (contestantId && compId){
      getContestantRoutes(compId,contestantId).then((data) => setRows(data))
      .catch(console.error);
    }
  }, [contestantId,compId]);


  return (
    <div className="container mx-auto py-10 w-90">
      <DataTable columns={ScoreColumn} data={rows} />
    </div>
  );
};
