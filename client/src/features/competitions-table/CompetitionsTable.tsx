import type { Competition } from "@/models/competition";
import { competitionColumns } from "./CompetitionColumns";
import React, { useContext, useEffect, useState } from "react";
import { DataRow, DataTable } from "@/components/ui/table";
import {
  getAllCompetitions,
  saveCompetitions,
} from "@/services/competitionService";
import { CircleX, Plus, Save, SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CompContext } from "@/components/layout/layout";
import { Spinner } from "@/components/ui/shadcn-io/spinner";



interface tableProps {
  isSelected: boolean;
  toggleEditing: (isSelected: boolean) => void;
  //onCompSelect: (selected: number) => void;
}

export const CompetitionsTable: React.FC<tableProps> = ({
  isSelected,
  //toggleEditing
  //onCompSelect,
}) => {
  const [competitions, setCompetitions] = useState<Competition[]>([]); // original copy of competitions, update when user saves any edits
  const [rows, setRows] = useState<Competition[]>([]); // rows for data table
  const ctx = useContext(CompContext);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    getAllCompetitions()
      .then((res: Competition[]) => {
        setCompetitions(res);
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

  // // save changes locally, and save to API
  // const handleSaveClick = () => {
  //   setCompetitions(rows);
  //   toggleEditing();
  //   console.log("SAVE", rows);

  //   saveCompetitions(rows);
  // };

  // // reset table rows when user cancels during edit
  // const handleCancelClick = () => {
  //   setRows(competitions);
  //   toggleEditing();
  // };

  const addRow = () => {
    const blankRow: Competition = {
      id: 0,
      date_of: "",
      type: "",
      is_active: false,
    };

    setRows([...rows, blankRow]);
  };


  const loadContent = () => {
    if (loading) {
      return (
        <>
          <span className="text-2xl font-medium">Competitions</span>

          <div className="px-5 border-1 rounded-sm bg-white shadow-xl" >
            <div className="mx-auto w-175 flex justify-center items-center min-h-[400px]">
              <Spinner variant="default" className="w-8 h-8 text-primary" />
            </div>
          </div>
        </>

      );
    }
    return (
      <>
        <span className="text-2xl font-medium">Competitions</span>
        <div className="px-5 pb-6 border-1 rounded-sm bg-white shadow-xl">
          {/* <div className="space-x-2 pt-5">
          <Button
            onClick={toggleEditing}
            className={`${isEdit ? "hidden" : ""}`}
            size="sm"
          >
            <SquarePen />
            Edit
          </Button>

          <Button
            size="sm"
            className={`${!isEdit ? "hidden" : ""}`}
            onClick={addRow}
          >
            <Plus />
            Add
          </Button>

          <Button
            size="sm"
            onClick={handleSaveClick}
            className={`${
              isEdit ? "bg-green-600" : "hidden"
            } hover:bg-green-700`}
          >
            <Save />
            Save
          </Button>

          <Button
            onClick={handleCancelClick}
            size="sm"
            className={`${isEdit ? "bg-red-500" : "hidden"} hover:bg-red-800`}
          >
            <CircleX />
            Cancel
          </Button>
        </div> */}

          <div className="mx-auto pt-5 w-175">
            <DataTable
              columns={competitionColumns}
              data={rows}
              onUpdate={handleUpdate}
              onRowClick={(row) => {
                if (!isSelected) {
                  //onCompSelect(row.id);

                  ctx?.setComp(row);
                }
              }}
              isEdit={false}
              isRouteSelected={isSelected}
            />
          </div>
        </div>
      </>
    );
  }
  return (
    < div>
      {loadContent()}
    </div >
  )
};
