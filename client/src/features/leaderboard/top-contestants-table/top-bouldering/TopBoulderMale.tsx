import type { Contestant } from "@/models/contestant";
import { LeaderboardContestantBoulderMale } from "./TopBoulderMaleColumn";
import React, { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/table";
import { getAllContestants } from "@/services/contestantService";
import { Spinner } from "@/components/ui/loadingWheel";

export const TopBoulderMale: React.FC = () => {
    const [contestants, setContestants] = useState<Contestant[]>([]);
    const [rows, setRows] = useState<Contestant[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
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


    const loadContent = () => {
        if (loading) {
            return (
                <>
                    <span className="text-sm font-bold">Top Male Boulder</span>

                    <div className="container mx-auto w-90 flex justify-center items-center min-h-[250px]">
                        <Spinner variant="default" className="w-8 h-8 text-primary" />
                    </div>
                </>
            )
        }
        return (
            <>
                <div className="container mx-auto w-90">
                    <DataTable columns={LeaderboardContestantBoulderMale} data={rows.slice(0, 5)} />
                </div>
            </>
        );
    }

    return (
        <div>
            {loadContent()}
        </div>
    )

}
