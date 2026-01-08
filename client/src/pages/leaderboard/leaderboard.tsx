import React, { useState, useEffect } from "react";
import { getLeaderboard } from "@/services/contestantService";
import { LeaderBoardChart } from "@/features/leaderboard/leaderboard-chart/LeaderBoardChart";
import type { Score } from "@/models/score";
import { TopClimbers } from "@/features/leaderboard/top-climbers/TopClimbers";
import { Trophy } from "lucide-react";
import { useCompetition } from "@/hooks/useCompetition";

const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<Score[]>([]);
  const [loading, setLoading] = useState(true);
  const { comp } = useCompetition();

  useEffect(() => {
    loadData();
  }, [comp.id]);

  const loadData = () => {
    setLoading(true);
    getLeaderboard(comp.id)
      .then((res: Score[]) => {
        setLeaderboard(res);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Trophy className="h-8 w-8 text-yellow-600" />
            Competition Leaderboard
          </h1>

          {loading ? (
            <div className="space-y-6">
              <div className="animate-pulse bg-white rounded-xl shadow-lg p-6">
                <div className="h-8 bg-gray-200 rounded mb-4"></div>
                <div className="h-64 bg-gray-200 rounded"></div>
              </div>
              <div className="animate-pulse bg-white rounded-xl shadow-lg p-6">
                <div className="h-8 bg-gray-200 rounded mb-4"></div>
                <div className="h-96 bg-gray-200 rounded"></div>
              </div>
            </div>
          ) : leaderboard.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-12 text-center">
              <Trophy className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No Results Yet
              </h3>
              <p className="text-gray-500">
                Start logging scores to see the leaderboard!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <LeaderBoardChart data={leaderboard} />

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-muted px-2 text-gray-500">
                    Top Climbers
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <TopClimbers />
    </div>
  );
};

export default Leaderboard;
