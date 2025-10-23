import React, { useState, useEffect } from "react";
import { getLeaderboard } from "@/services/contestantService";
import { LeaderBoardChart } from "@/features/leaderboard/leaderboard-chart/LeaderBoardChart";
import type { Score } from "@/models/score";
import {TopClimbers} from "@/features/leaderboard/top-climbers/TopClimbers";
const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<Score[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    getLeaderboard()
      .then((res: Score[]) => {
        console.log("School Leaderboard:", res);
        setLeaderboard(res);
      })
      .catch(console.error);
  };

  return (
    <div className="flex flex-col container mx-auto p-4 gap-6 ">
      <div className="w-full max-w-3xl mx-auto mt-5">
        <LeaderBoardChart data={leaderboard}/>
        
                  <TopClimbers/>

        
      </div>

    </div>
  );
};

export default Leaderboard;
