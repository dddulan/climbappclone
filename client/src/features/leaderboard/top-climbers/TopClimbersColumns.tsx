import type { ColumnDef } from "@tanstack/react-table";
import type { Contestant } from "@/models/contestant";

export const LeaderboardContestants: ColumnDef<Contestant>[] = [
    {
        accessorKey: "name",
        header: "Top Contestants",
    },


];