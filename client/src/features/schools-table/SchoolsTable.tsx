import type { School } from "@/models/school";
import React, { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/table";
import { getAllSchools, createSchool } from "@/services/contestantService";
import { SchoolColums } from "./SchoolsColumns";
import { Spinner } from "@/components/ui/loadingWheel";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const SchoolsTable: React.FC = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [rows, setRows] = useState<School[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [schoolName, setSchoolName] = useState<string>("");
  // const [school_id]

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    getAllSchools()
      .then((res: School[]) => {
        setSchools(res);
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

  // Button function to handle submission of a new school
  const onSubmit = async () => {
    //checks if schoolName is filled
    if (!schoolName) {
      toast("Missing infomation", {
        description: "Please add a school name",
        className: "!bg-red-600 !text-neutral-800 !border-neutral-400",
      });
      return;
    }

    // Create a new school object
    const newSchool: School = {
      id: 0,
      name: schoolName,
    };

    createSchool(newSchool).then(() => {
      loadData();
    });

    setSchoolName("");
  };

  const loadContent = () => {
    if (loading) {
      return (
        <>
          <span className="text-2xl font-medium">Schools</span>

          <div className="py-5">
            <div className="flex container space-x-2 pt-5 justify-center items-center min-h-[260px]">
              <Spinner variant="default" className="w-8 h-8 text-primary" />
            </div>
          </div>
        </>
      );
    }
    return (
      <>
        <span className="text-2xl font-medium">Schools</span>

        <div className="py-5 container bg-white">
          <div className="flex space-x-2 pt-5">
            {/* <Label>Add School:</Label> */}
            <Input
              value={schoolName}
              id="schoolName"
              type="schoolName"
              placeholder="Sheldon High School"
              onChange={(e) => setSchoolName(e.target.value)}
              className="bg-neutral-100 border-neutral-200"
              required
            />
            <Button size="default" variant="default" onClick={onSubmit}>
              {/* disabled={
                                !schoolName
                            } */}
              <Plus />
            </Button>
          </div>
          <div className="container mx-auto py-5 w-full">
            <DataTable
              columns={SchoolColums}
              data={rows}
              onDeselect={(rowIndex, isSave) => {
                // edit row was just canceled, revert row back to pre-edit state
                setRows((old) =>
                  old.map((row, index) =>
                    // search rows until we find rowIndex
                    index === rowIndex && !isSave ? schools[index] : row
                  )
                );
              }}
              onUpdate={handleUpdate}
              onDelete={() => {
                loadData();
              }}
            />
          </div>
        </div>
      </>
    );
  };

  return <div>{loadContent()}</div>;
};
