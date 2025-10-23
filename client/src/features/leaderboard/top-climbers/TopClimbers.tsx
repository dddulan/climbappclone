import React, { useState, useEffect } from "react";

import { DataTable } from "@/components/ui/table";
import { LeaderboardContestants } from "./TopClimbersColumns";
import { getContestantScores } from "@/services/contestantService";
import type { Score } from "@/models/score";

// Interface for leaderboard data with rank
interface LeaderboardEntry {
  rank: number;
  contestant_name: string;
  gender: string;
  school_name: string;
  score: number;
}

export const TopClimbers: React.FC = () => {
  const [contestantsScores, setContestantsScores] = useState<Score[]>([]);
  const [maleLeaderboard, setMaleLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [femaleLeaderboard, setFemaleLeaderboard] = useState<LeaderboardEntry[]>([]);
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    getContestantScores()
      .then((res: Score[]) => {
        console.log("Contestant Scores:", res);
        setContestantsScores(res);

        // Filter and sort male contestants
        const maleContestants = res
          .filter((score) => score.gender?.toLowerCase() === "male")
          .sort((a, b) => (b.score || 0) - (a.score || 0))
          .slice(0, 5)
          .map((score, index) => ({
            rank: index + 1,
            contestant_name: score.contestant_name || "",
            gender: score.gender || "",
            school_name: score.school_name || "",
            score: score.score || 0,
          }));

        // Filter and sort female contestants
        const femaleContestants = res
          .filter((score) => score.gender?.toLowerCase() === "female")
          .sort((a, b) => (b.score || 0) - (a.score || 0))
          .slice(0, 5)
          .map((score, index) => ({
            rank: index + 1,
            contestant_name: score.contestant_name || "",
            gender: score.gender || "",
            school_name: score.school_name || "",
            score: score.score || 0,
          }));

        setMaleLeaderboard(maleContestants);
        setFemaleLeaderboard(femaleContestants);
      })
      .catch(console.error);
  };

  return (
    <div className="container mx-auto py-10 w-90">
      <div className="gap-6 flex flex-col">
        {/* Top Male and Female Leaderboards */}
        <div className="flex flex-row gap-10">
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-4">Top Male Climbers</h2>
            <DataTable columns={LeaderboardContestants} data={maleLeaderboard} />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-4">Top Female Climbers</h2>
            <DataTable columns={LeaderboardContestants} data={femaleLeaderboard} />
          </div>
        </div>
      </div>
    </div>
  );
};
