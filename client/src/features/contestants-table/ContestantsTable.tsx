import type { Contestant } from "@/models/contestant";
import { ContestantColums } from "./ContestantsColumns";
import React, { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/table";
import { getAllContestants } from "@/services/contestantService";


export const ContestantsTable: React.FC = () => {
    const [contestants, setContestants] = useState<Contestant[]>([]);
    const [rows, setRows] = useState<Contestant[]>([]);
    const [isEdit, setIsEdit] = useState<boolean>(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        getAllContestants()
            .then((res: Contestant[]) => {
                setContestants(res);
                setRows(res);
            })
            .catch(console.error);
    };

    return (
        <div className="container mx-auto py-10 w-90">
            <DataTable columns={ContestantColums} data={rows} />
        </div>
    );
}
