import type { ColumnDef } from "@tanstack/react-table";
import { RankBadge } from "./RankBadge";
import type { Score } from "@/models/score";

export const LeaderboardContestants: ColumnDef<Score>[] = [
  {
    accessorKey: "rank",
    header: "",
    cell: ({ row }) => <RankBadge rank={row.index + 1} />,
  },
  {
    accessorKey: "contestant_name",
    header: "Contestant",
  },
  {
    accessorKey: "school_name",
    header: "",
  },
  {
    accessorKey: "score",
    header: "Score",
    cell: ({ row }) => (
      <div className="font-semibold">{row.getValue("score")}</div>
    ),
  },
];
