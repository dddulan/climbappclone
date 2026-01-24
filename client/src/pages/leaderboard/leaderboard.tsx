import React from "react";
import { LeaderBoardChart } from "@/features/leaderboard/leaderboard-chart/LeaderBoardChart";
import { TopClimbers } from "@/features/leaderboard/top-climbers/TopClimbers";
import { Trophy } from "lucide-react";

const Leaderboard: React.FC = () => {
  return (
    <div>
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Trophy className="h-8 w-8 text-yellow-600" />
            Leaderboard
          </h1>

          <LeaderBoardChart />
        </div>
      </div>
      <div>
        <TopClimbers />
      </div>
    </div>
  );
};

export default Leaderboard;
