import type { ColumnDef } from "@tanstack/react-table";
import type { Contestant } from "@/models/contestant";

export const LeaderboardContestantBoulder: ColumnDef<Contestant>[] = [
    {
        accessorKey: "name",
        header: "Top Bouldering Contestants",
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