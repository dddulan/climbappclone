import React, { useState, useEffect } from "react";

import { TrendingUp } from "lucide-react";
import { TopBoulderTable } from "@/features/leaderboard/top-contestants-table/top-bouldering/TopBoulderTable";
import { TopBoulderFemale } from "@/features/leaderboard/top-contestants-table/top-bouldering/TopBoulderFemale";
import { TopBoulderMale} from "@/features/leaderboard/top-contestants-table/top-bouldering/TopBoulderMale";
import { TopRopesFemale } from "@/features/leaderboard/top-contestants-table/top-ropes/TopRopesFemale";
import { TopRopesMale } from "@/features/leaderboard/top-contestants-table/top-ropes/TopRopesMale";
import { getAllContestants, getAllSchools } from "@/services/contestantService";
import type { School } from "@/models/school";
import type { Contestant } from "@/models/contestant";
import { TopSchoolsTable } from "@/features/leaderboard/top-schools-table/TopSchoolsTable";
import { LeaderBoardChart } from "@/features/leaderboard/leaderboard-chart/LeaderBoardChart";
import { TopRopesTable } from "@/features/leaderboard/top-contestants-table/top-ropes/TopRopesTable";

const Leaderboard: React.FC = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [contestants, setContestants] = useState<Contestant[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    getAllSchools()
      .then((res: School[]) => {
        setSchools(res);
      })
      .catch(console.error);
    getAllContestants().then((res: Contestant[]) => {
      setContestants(res);
    });
  };

  return (
    <div className="flex flex-col container mx-auto p-4 gap-6 ">
      <div className="w-full max-w-3xl mx-auto mt-5">
        <LeaderBoardChart />
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
