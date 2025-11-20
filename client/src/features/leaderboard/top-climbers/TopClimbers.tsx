import React, { useState, useEffect, useContext } from "react";

import { DataTable } from "@/components/ui/table";
import { LeaderboardContestants } from "./TopClimbersColumns";
import { getContestantScores } from "@/services/contestantService";
import type { Score } from "@/models/score";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CompContext } from "@/components/layout/layout";

export const TopClimbers: React.FC = () => {
  const [maleLeaderboard, setMaleLeaderboard] = useState<Score[]>([]);
  const [femaleLeaderboard, setFemaleLeaderboard] = useState<Score[]>([]);
  const ctx = useContext(CompContext)!;
  // Get competition type from context (e.g., "Boulder", "Top Rope", "Both")
  const competitionType = ctx?.comp?.type || "";

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    getContestantScores(ctx.comp.id)
      .then((res: Score[]) => {
        // Filter and sort male contestants
        const maleContestants = res.filter(
          (score) => score.gender?.toLowerCase() === "male"
        );

        // Filter and sort female contestants
        const femaleContestants = res.filter(
          (score) => score.gender?.toLowerCase() === "female"
        );

        setMaleLeaderboard(maleContestants);
        setFemaleLeaderboard(femaleContestants);
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
