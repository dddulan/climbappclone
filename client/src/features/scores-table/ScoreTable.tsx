import React, { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/table";
import { ScoreColumn } from "./ScoreColumn";
import type { Score } from "@/models/score";
import { getContestantRoutes } from "@/services/contestantService";
interface ScoreTableProps {
  data: Score[];
  contestantId?: number;
  compId?: number;
}
export const ScoreTable: React.FC<ScoreTableProps> = ({
  data,
}) => {
  const [rows, setRows] = useState<Score[]>([]);
  //const { comp } = useCompetition();
  useEffect(() => {
    const sortedByPoints = data.sort(
      (a, b) => (b.points_earned || 0) - (a.points_earned || 0)
    );
    setRows(sortedByPoints);
  }, [data]);

  return (
    <div className="container mx-auto  w-90 ">
      <DataTable columns={ScoreColumn} data={rows.slice(0,3)} showPagination={false} />
    </div>
  );
};
