import React, { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/table";
import { ScoreColumn } from "./ScoreColumn";
import type { Score } from "@/models/score";
import { getContestantRoutes } from "@/services/contestantService";
interface ScoreTableProps {
  contestantId?: number;
  compId?: number;
}
export const ScoreTable: React.FC<ScoreTableProps> = ({
  compId,
  contestantId,
}) => {
  const [rows, setRows] = useState<Score[]>([]);
  //const { comp } = useCompetition();
  useEffect(() => {
    if (contestantId && compId) {
      getContestantRoutes(compId, contestantId)
        .then((data) => {
          const sortedByPoints = data.sort(
            (a, b) => (b.points_earned || 0) - (a.points_earned || 0)
          );
          setRows(sortedByPoints);
        })
        .catch(console.error);
    }
  }, [contestantId, compId]);

  return (
    <div className="container mx-auto  w-90 ">
      <DataTable
        columns={ScoreColumn}
        data={rows.slice(0, 3)}
        showPagination={false}
      />
    </div>
  );
};
