import type { ColumnDef } from "@tanstack/react-table";
import type { Contestant } from "@/models/contestant";

export const LeaderboardContestantBoulderFemale: ColumnDef<Contestant>[] = [
    {
        accessorKey: "name",
        header: "Top Female Boulder",
    },
    {
        accessorKey: "gender",
        header: ""
    },
    {
        accessorKey: "school",
        header: ""
    },
];