import React, { useState, useEffect } from "react";
import { getLeaderboard } from "@/services/contestantService";
import { LeaderBoardChart } from "@/features/leaderboard/leaderboard-chart/LeaderBoardChart";
import type { Score } from "@/models/score";
import { TopClimbers } from "@/features/leaderboard/top-climbers/TopClimbers";
import { Trophy } from "lucide-react";
import { useCompetition } from "@/hooks/useCompetition";

const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<Score[]>([]);
  const { comp } = useCompetition();

  useEffect(() => {
    loadData();
  }, [comp.id]);

  const loadData = () => {
    getLeaderboardData();
  };

  const getLeaderboardData = () => {
    getLeaderboard(comp.id)
      .then((res: Score[]) => {
        setLeaderboard(res);
      })
      .catch(console.error)
  };

  return (
    <div>
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Trophy className="h-8 w-8 text-yellow-600" />
            Leaderboard
          </h1>

            <LeaderBoardChart data={leaderboard} />
          
        </div>
      </div>
      <div>
        <TopClimbers />
      </div>
    </div>
  );
};

export default Leaderboard;
