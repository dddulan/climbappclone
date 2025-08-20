import type { Competition } from "@/models/competition";
import { competitionColumns } from "./CompetitionColumns";
import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/ui/table";
import { getAllCompetitions } from "@/services/competitionService";

export const CompetitionsTable: React.FC = () => {
  const [competitions, setCompetitions] = useState<Competition[]>([]); // original copy of competitions, update when user saves any edits
  const [rows, setRows] = useState<Competition[]>([]); // rows for data table
  const [isEdt, setIsEdit] = useState<boolean>(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    getAllCompetitions()
      .then((res: Competition[]) => {
        setCompetitions(res);
        setRows(res);
      })
      .catch(console.error);
  };

  return (
    <div className="container mx-auto py-10 w-90">
      <DataTable columns={competitionColumns} data={rows} />
    </div>
  );
};