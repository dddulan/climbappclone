import type { ColumnDef } from "@tanstack/react-table";
import type { Contestant } from "@/models/contestant";

export const LeaderboardContestantRopes: ColumnDef<Contestant>[] = [
    {
        accessorKey: "name",
        header: "Top Ropes Contestants",
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