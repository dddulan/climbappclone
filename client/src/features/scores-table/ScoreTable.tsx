import React, { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/table";
import { ScoreColumn } from "./ScoreColumn";
import type { Score } from "@/models/score";

export const ScoreTable: React.FC = () => {
   
    const [rows, setRows] = useState<Score[]>([]);


    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
    };

    return (
        <div className="container mx-auto py-10 w-90">
            <DataTable columns={ScoreColumn} data={rows} />
        </div>
    );
}
