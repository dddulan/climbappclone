import type { ColumnDef } from "@tanstack/react-table";

// Interface for leaderboard data
interface LeaderboardEntry {
  rank: number;
  contestant_name: string;
  gender: string;
  school_name: string;
  score: number;
}

export const LeaderboardContestants: ColumnDef<LeaderboardEntry>[] = [
    {
        accessorKey: "rank",
        header: "Rank",
        cell: ({ row }) => <div className="font-semibold">#{row.getValue("rank")}</div>,
    },
    {
        accessorKey: "contestant_name",
        header: "Contestant",
    },
    {
        accessorKey: "score",
        header: "Score",
        cell: ({ row }) => <div className="font-semibold">{row.getValue("score")}</div>,
    },
];