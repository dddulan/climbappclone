import type { ColumnDef } from "@tanstack/react-table";
import type { Score } from "@/models/score";

export const ScoreColumn: ColumnDef<Score>[] = [
      {
    accessorKey: "route_number",
    header: "Number",
  },
  {
    accessorKey: "color",
    header: "Color",
  },
    {
    accessorKey: "grade",
    header: "Grade"
  },
  {
    accessorKey: "points_earned",
    header: "Points Earned",
  },
];
