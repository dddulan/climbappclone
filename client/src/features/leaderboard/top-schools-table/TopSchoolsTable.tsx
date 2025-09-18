import type { School } from "@/models/school";
import React, { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/table";
import { getAllSchools } from "@/services/contestantService";
import { TopSchoolsColumns } from "./TopSchoolsColumns";
export const TopSchoolsTable: React.FC = () => {
    const [school, setSchools] = useState<School[]>([]);
    const [rows, setRows] = useState<School[]>([]);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        getAllSchools()
            .then((res: School[]) => {
                setSchools(res);
                setRows(res);
            })
            .catch(console.error);
    };

    return (
        <div className="container mx-auto w-90">
            <DataTable columns={TopSchoolsColumns} data={rows} />
        </div>
    );
}