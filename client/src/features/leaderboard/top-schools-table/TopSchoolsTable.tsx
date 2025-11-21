import type { School } from "@/models/school";
import React, { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/table";
import { getAllSchools } from "@/services/contestantService";
import { TopSchoolsColumns } from "./TopSchoolsColumns";
import { Spinner } from "@/components/ui/loadingWheel";
export const TopSchoolsTable: React.FC = () => {
  const [school, setSchools] = useState<School[]>([]);
  const [rows, setRows] = useState<School[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

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

  const loadContent = () => {
    if (loading) {
      return (
        <>
          <span className="text-sm font-bold">Top Schools</span>

          <div className="container mx-auto w-full flex justify-center items-center min-h-[300px]">
            <Spinner variant="default" className="w-8 h-8 text-primary" />
          </div>
        </>
      );
    }
    return (
      <>
        <div className="container mx-auto w-full">
          <DataTable columns={TopSchoolsColumns} data={rows} />
        </div>
      </>
    );
  }
  return (
    <div>
      {loadContent()}
    </div>
  )

};
