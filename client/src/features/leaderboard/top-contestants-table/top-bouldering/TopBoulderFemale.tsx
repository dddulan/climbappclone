import type { Contestant } from "@/models/contestant";
import React, { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/table";
import { getAllContestants } from "@/services/contestantService";
import { LeaderboardContestantBoulderFemale } from "./TopBoulderFemaleColumn";


export const TopBoulderFemale: React.FC = () => {
    const [contestants, setContestants] = useState<Contestant[]>([]);
    const [rows, setRows] = useState<Contestant[]>([]);

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

const temp: Contestant[] = [
  { id: 1, name: "Alice Johnson",  school_id: 1, competition_id: 1, gender: "Female" },
  { id: 2, name: "Brian Lee",  school_id: 2, competition_id: 1, gender: "Male" },
  { id: 3, name: "Chloe Kim",  school_id: 3, competition_id: 1, gender: "Female" },
  { id: 4, name: "David Smith",  school_id: 4, competition_id: 1, gender: "Male" },
  { id: 5, name: "Emma Garcia",  school_id: 5, competition_id: 1, gender: "Female" },
  { id: 6, name: "Felix Wong",  school_id: 6, competition_id: 1, gender: "Male" },
  { id: 7, name: "Grace Patel", school_id: 7, competition_id: 1, gender: "Female" },
  { id: 8, name: "Henry Thompson",  school_id: 8, competition_id: 1, gender: "Male" },
  { id: 9, name: "Isla Martinez", school_id: 9, competition_id: 1, gender: "Female" },
  { id: 10, name: "Jack Nguyen", school_id: 10, competition_id: 1, gender: "Male" },
  
];

    return (
        <div className="container mx-auto w-90">
            <DataTable columns={LeaderboardContestantBoulderFemale} data={temp.slice(0,5)} />
        </div>
    );
}
