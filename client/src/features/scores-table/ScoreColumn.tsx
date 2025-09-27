import type { ColumnDef } from "@tanstack/react-table";
import type { Score } from "@/models/score";

export const ScoreColumn: ColumnDef<Score>[] = [
    {
        accessorKey: "route",
        header: ""
    },


];