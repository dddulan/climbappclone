import type { School } from "@/models/school";
import React, { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/table";
import { getAllSchools } from "@/services/contestantService";
import { SchoolColums } from "./SchoolsColumns";
import { Spinner } from "@/components/ui/loadingWheel";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";


export const SchoolsTable: React.FC = () => {
  const [school, setSchools] = useState<School[]>([]);
  const [rows, setRows] = useState<School[]>([]);
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
                <div className="px-5 border-1 rounded-sm" >
                    <div className="flex flex-col items-center justify-center pt-5 nim-h-[300px] space-y-4 w-full">
                        <Spinner variant="default" className="w-8 h-8 text-primary" />
                    </div>
    </div>
  );
        }
        return (
            <>
                <span className="text-2xl font-medium">Schools</span>
                <div className="px-5 border rounded-sm">
                    <div className="mx-auto pt-5 w-full max-w-[900px]">
                        <DataTable columns={SchoolColums} data={rows}/>
                    </div>
                </div>
            </>
        );
    }
    return (
        < div className="container mx-auto py-10 w-90" >
            {loadContent()}
        </div >
    )
}
