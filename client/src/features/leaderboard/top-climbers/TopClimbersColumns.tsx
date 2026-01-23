import type { ColumnDef } from "@tanstack/react-table";
import { RankBadge } from "./RankBadge";
import type { Score } from "@/models/score";

export const LeaderboardContestants: ColumnDef<Score>[] = [
  {
    accessorKey: "rank",
    header: "",
    cell: ({ row }) => (
      <div>
        <RankBadge rank={row.index + 1} />
      </div>
    ),
  },
  {
    accessorKey: "contestant_name",
    header: "Contestant",
    cell: ({ row }) => (
      <div className="whitespace-normal">{row.getValue("contestant_name")}</div>
    ),
  },
  // {
  //   accessorKey: "school_name",
  //   header: "School",
  //   cell: ({ row }) => (
  //     <div className="whitespace-normal">{row.getValue("school_name")}</div>
  //   ),
  // },
  {
    accessorKey: "score",
    header: "Score",
    cell: ({ row }) => (
      <div className="font-semibold">{row.getValue("score")}</div>
    ),
  },
];
