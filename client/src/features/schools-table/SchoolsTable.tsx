import type { School } from "@/models/school";
import React, { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/table";
import { getAllSchools, createSchool } from "@/services/contestantService";
import { SchoolColums } from "./SchoolsColumns";
import { Spinner } from "@/components/ui/loadingWheel";
import { Button } from "@/components/ui/button";
import { Plus, SquareArrowDown, SquareArrowUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const SchoolsTable: React.FC = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [rows, setRows] = useState<School[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [schoolName, setSchoolName] = useState<string>("");
  const [showSchoolForm, setShowAddForm] = useState<boolean>(() => {
    const saved = localStorage.getItem("showCompForm");
    return saved ? JSON.parse(saved) : false;
  });

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

  const handleShowAddForm = () => {
    setShowAddForm(!showSchoolForm);
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
    })

    setSchoolName("");
  };



  return (
    <>
      <span
        className={`flex items-center text-3xl font-medium px-4 py-2 cursor-pointer gap-2 hover:bg-neutral-200 `}
        onClick={handleShowAddForm}
      >
        Schools
        <div className="flex items-center">
          {showSchoolForm ? <SquareArrowUp /> : <SquareArrowDown />}
        </div>
      </span>
      {loading ? (
        <div>
          <div className="flex container space-x-2 pt-5 justify-center items-center min-h-[260px]">
            <Spinner variant="default" className="w-8 h-8 text-primary" />
          </div>
        </div>
      ) : (
        <div>
          <div
            className="overflow-hidden transition-all duration-500 ease-in-out"
            style={{
              maxHeight: showSchoolForm ? "150px" : "0",
            }}
          >
            <div className="flex p-5 bg-neutral-200">
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
          </div>
          <div className="container mx-auto w-full p-4">
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
      )}
    </>
  );
};
