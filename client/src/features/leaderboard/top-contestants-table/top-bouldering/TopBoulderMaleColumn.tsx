import type { ColumnDef } from "@tanstack/react-table";
import type { Contestant } from "@/models/contestant";

export const LeaderboardContestantBoulderMale: ColumnDef<Contestant>[] = [
    {
        accessorKey: "name",
        header: "Top Male Boulder ",
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