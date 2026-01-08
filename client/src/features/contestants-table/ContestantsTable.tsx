import type { Contestant } from "@/models/contestant";
import { ContestantColums } from "./ContestantsColumns";
import React, { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/table";
import { getAllContestants } from "@/services/contestantService";
import { Spinner } from "@/components/ui/loadingWheel";

export const ContestantsTable: React.FC = () => {
  const [contestants, setContestants] = useState<Contestant[]>([]);
  const [rows, setRows] = useState<Contestant[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    getAllContestants()
      .then((res: Contestant[]) => {
        setContestants(res);
        setRows(res);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleUpdate = (rowIndex: number, columnId: string, value: unknown) => {
    setRows((old) =>
      old.map((row, index) =>
        index === rowIndex ? { ...row, [columnId]: value } : row
      )
    );
  };

  return (
    <>
      <span
        className={`flex items-center text-3xl font-medium px-4 py-2 gap-2`}>
        Contestants
      </span>
      {loading ? (
        <div className="flex container space-x-2 mx-auto pt-5 w-full justify-center items-center min-h-[300px]">
          <Spinner variant="default" className="w-8 h-8 text-primary" />
        </div>
      ) : (
        <div className="container mx-auto w-full p-4">
          <DataTable
            columns={ContestantColums}
            data={rows}
            onDeselect={(rowIndex, isSave) => {
              // edit row was just canceled, revert row back to pre-edit state
              setRows((old) =>
                old.map((row, index) =>
                  // search rows until we find rowIndex
                  index === rowIndex && !isSave ? contestants[index] : row
                )
              );
            }}
            onUpdate={handleUpdate}
            onDelete={() => {
              loadData();
            }}
          />
        </div>
      )}
    </>
  );
};
