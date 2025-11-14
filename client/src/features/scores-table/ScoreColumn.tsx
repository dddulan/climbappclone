import type { ColumnDef } from "@tanstack/react-table";
import type { Score } from "@/models/score";

export const ScoreColumn: ColumnDef<Score>[] = [
  {
    accessorKey: "number",
    header: "Route",
  },
    {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "attempt",
    header: "Attempt",
  },
  {
    accessorKey: "points_earned",
    header: "Points Earned",
  },
];
