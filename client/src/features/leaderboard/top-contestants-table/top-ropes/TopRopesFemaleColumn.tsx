import type { ColumnDef } from "@tanstack/react-table";
import type { Contestant } from "@/models/contestant";

export const LeaderboardContestantRopesFemale: ColumnDef<Contestant>[] = [
  {
    accessorKey: "name",
    header: "Top Female Ropes",
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
