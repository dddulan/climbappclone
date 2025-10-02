import React, { useState, useEffect } from "react";
import { TopBoulderTable } from "@/features/leaderboard/top-contestants-table/top-bouldering/TopBoulderTable";
import { TopBoulderFemale } from "@/features/leaderboard/top-contestants-table/top-bouldering/TopBoulderFemale";
import { TopBoulderMale} from "@/features/leaderboard/top-contestants-table/top-bouldering/TopBoulderMale";
import { TopRopesFemale } from "@/features/leaderboard/top-contestants-table/top-ropes/TopRopesFemale";
import { TopRopesMale } from "@/features/leaderboard/top-contestants-table/top-ropes/TopRopesMale";import {
  getContestantScores,
  getLeaderboard,
} from "@/services/contestantService";
import { TopSchoolsTable } from "@/features/leaderboard/top-schools-table/TopSchoolsTable";
import { LeaderBoardChart } from "@/features/leaderboard/leaderboard-chart/LeaderBoardChart";
import { TopRopesTable } from "@/features/leaderboard/top-contestants-table/top-ropes/TopRopesTable";
import type { Score } from "@/models/score";

const Leaderboard: React.FC = () => {
  const [leaderboard, setLeaderboard] = useState<Score[]>([]);
  const [contestantScores, setContestantsScores] = useState<Score[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    getLeaderboard()
      .then((res: Score[]) => {
        console.log("SCHOOL", res);
        setLeaderboard(res);
        res.reduce;
      })
      .catch(console.error);

    getContestantScores()
      .then((res: Score[]) => {
        console.log("CONT", res);
        setContestantsScores(res);
        res.reduce;
      })
      .catch(console.error);
  };

  return (
    <div className="flex flex-col container mx-auto p-4 gap-6 ">
      <div className="w-full max-w-3xl mx-auto mt-5">
        <LeaderBoardChart data={leaderboard}/>
      </div>
<div className="flex flex-row gap-6 justify-center container mx-auto">
      <div className="  border-1 bg-white rounded-sm p-4 shadow-xl">
        <TopSchoolsTable />
      </div>
      <div className="  border-1 bg-white rounded-sm p-4 shadow-xl">
        <TopBoulderMale />
        <TopBoulderFemale />
      </div>
      <div className="  border-1 bg-white rounded-sm p-4 shadow-xl">
        <TopRopesMale />
        <TopRopesFemale />
      </div>
    </div>
    </div>
  );
};

export default Leaderboard;
