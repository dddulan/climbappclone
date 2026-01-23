import React, { useState, useEffect } from "react";

import { DataTable } from "@/components/ui/table";
import { LeaderboardContestants } from "./TopClimbersColumns";
import { getContestantScores } from "@/services/contestantService";
import type { Score } from "@/models/score";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCompetition } from "@/hooks/useCompetition";

export const TopClimbers: React.FC = () => {
  const [maleLeaderboard, setMaleLeaderboard] = useState<Score[]>([]);
  const [femaleLeaderboard, setFemaleLeaderboard] = useState<Score[]>([]);
  const [nonbinaryLeaderboard, setNonbinaryLeaderboard] = useState<Score[]>([]);
  const { comp } = useCompetition();
  // Get competition type from context (e.g., "Boulder", "Top Rope", "Both")
  const competitionType = comp?.type || "";

  useEffect(() => {
    loadData();
  }, [comp.id]);

  const loadData = () => {
    getContestantScores(comp.id)
      .then((res: Score[]) => {
        // Filter and sort male contestants
        const maleContestants = res.filter(
          (score) => score.gender?.toLowerCase() === "male",
        );

        // Filter and sort female contestants
        const femaleContestants = res.filter(
          (score) => score.gender?.toLowerCase() === "female",
        );
        // Filter and sort non-binary contestants
        const nonbinaryContestants = res.filter(
          (score) => score.gender?.toLowerCase() === "non-binary",
        );

        setMaleLeaderboard(maleContestants);
        setFemaleLeaderboard(femaleContestants);
        setNonbinaryLeaderboard(nonbinaryContestants);
      })
      .catch(console.error);
  };

  useEffect(() => {
    loadData();
    //refreshes the top climbers every 15 seconds
    const interval = setInterval(loadData, 15000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="container mx-auto pt-5 w-full">
      <div className="gap-6 flex flex-col">
        {/* Top Male and Female Leaderboards */}

        <div className="flex flex-row gap-4">
          {maleLeaderboard.length > 0 && (
            <div className="flex-1">
              <Card className="gap-0">
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
              <Card className="gap-0">
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

          {nonbinaryLeaderboard.length > 0 && (
            <div className="flex-1">
              <Card className="gap-0">
                <CardHeader>
                  <CardTitle>
                    Top Non-Binary {competitionType} Climbers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <DataTable
                    columns={LeaderboardContestants}
                    data={nonbinaryLeaderboard}
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
