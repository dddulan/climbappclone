import React, { useState, useEffect, useContext } from "react";

import { DataTable } from "@/components/ui/table";
import { LeaderboardContestants } from "./TopClimbersColumns";
import { getContestantScores } from "@/services/contestantService";
import type { Score } from "@/models/score";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CompContext } from "@/components/layout/layout";

// Interface for leaderboard data with rank
interface LeaderboardEntry {
  rank: number;
  contestant_name: string;
  gender: string;
  school_name: string;
  score: number;
}

export const TopClimbers: React.FC = () => {
  const ctx = useContext(CompContext);
  const [maleLeaderboard, setMaleLeaderboard] = useState<LeaderboardEntry[]>(
    []
  );
  const [femaleLeaderboard, setFemaleLeaderboard] = useState<
    LeaderboardEntry[]
  >([]);

  // Get competition type from context (e.g., "Boulder", "Top Rope", "Both")
  const competitionType = ctx?.comp?.type || "";

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    getContestantScores()
      .then((res: Score[]) => {
        console.log("Contestant Scores:", res);

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

        // DUMMY DATA
        const dummyFemaleData: LeaderboardEntry[] = [
          {
            rank: 1,
            contestant_name: "Sarah Johnson",
            gender: "Female",
            school_name: "Duncan High",
            score: 950,
          },
          {
            rank: 2,
            contestant_name: "Emily Chen",
            gender: "Female",
            school_name: "Fresno High",
            score: 880,
          },
          {
            rank: 3,
            contestant_name: "Maria Garcia",
            gender: "Female",
            school_name: "Edison High",
            score: 820,
          },
          {
            rank: 4,
            contestant_name: "Jessica Brown",
            gender: "Female",
            school_name: "Bullard High",
            score: 775,
          },
          {
            rank: 5,
            contestant_name: "Amanda Lee",
            gender: "Female",
            school_name: "Hoover High",
            score: 720,
          },
        ];

        setMaleLeaderboard(maleContestants);
        setFemaleLeaderboard(dummyFemaleData); // change back to femaleContestants
      })
      .catch(console.error);
  };

  return (
    <div className="container mx-auto py-10 w-90">
      <div className="gap-6 flex flex-col">
        {/* Top Male and Female Leaderboards */}
        <div className="flex flex-row gap-6">
          {maleLeaderboard.length > 0 && (
            <div className="flex-1">
              <Card>
                <CardHeader>
                  <CardTitle>Top Male {competitionType} Climbers</CardTitle>
                </CardHeader>
                <CardContent>
                  <DataTable
                    columns={LeaderboardContestants}
                    data={maleLeaderboard}
                    showPagination={false}
                  />
                </CardContent>
              </Card>
            </div>
          )}
          {femaleLeaderboard.length > 0 && (
            <div className="flex-1">
              <Card>
                <CardHeader>
                  <CardTitle>Top Female {competitionType} Climbers</CardTitle>
                </CardHeader>
                <CardContent>
                  <DataTable
                    columns={LeaderboardContestants}
                    data={femaleLeaderboard}
                    showPagination={false}
                  />
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
