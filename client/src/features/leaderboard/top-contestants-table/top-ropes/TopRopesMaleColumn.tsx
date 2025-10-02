import type { ColumnDef } from "@tanstack/react-table";
import type { Contestant } from "@/models/contestant";

export const LeaderboardContestantRopesMale: ColumnDef<Contestant>[] = [
  {
    accessorKey: "name",
    header: "Top Male Ropes ",
  },
  {
    accessorKey: "gender",
    header: "",
  },
  {
    accessorKey: "school",
    header: "",
  },
];
