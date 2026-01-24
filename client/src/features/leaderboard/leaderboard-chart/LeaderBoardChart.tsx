import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
  Cell,
} from "recharts";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { ChartConfig } from "@/components/ui/chart";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { Score } from "@/models/score";
import { getLeaderboard } from "@/services/contestantService";
import { useCompetition } from "@/hooks/useCompetition";
import { Trophy } from "lucide-react";

export const LeaderBoardChart: React.FC = () => {
  const [chartData, setChartData] = useState<Score[]>([]);
  const [max, setMax] = useState<number>(0);
  const { comp } = useCompetition();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [comp.id]);

  const loadData = () => {
    setLoading(true);
    getLeaderboardData();
  };

  const getLeaderboardData = () => {
    getLeaderboard(comp.id)
      .then((res: Score[]) => {
        setChartData(res);

        // set maximum length used for chart width
        if (res.length > 0) {
          let highest = Math.max(...res.map((item) => item.score));
          setMax(highest * 1.2);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  // Refresh leaderboard every 15s
  useEffect(() => {
    const interval = setInterval(getLeaderboardData, 15000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const colors = [
    "#3b82f6",
    "#f97316",
    "#10b981",
    "#ef4444",
    "#8b5cf6",
    "#eab308",
    "#14b8a6",
    "#f43f5e",
    "#22d3ee",
  ];

  const chartConfig = {
    desktop: {
      label: "score",
    },
    mobile: {
      label: "Mobile",
    },
    label: {
      color: "red",
    },
  } satisfies ChartConfig;

  return (
    <div>
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
      ) : chartData.length === 0 ? (
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
        <Card className="gap-0">
          <CardContent>
            <ChartContainer config={chartConfig}>
              <BarChart
                accessibilityLayer
                data={chartData}
                layout="vertical"
                margin={{
                  left: 150,
                }}
              >
                <CartesianGrid horizontal={false} />
                <YAxis
                  dataKey="school_name"
                  type="category"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                  hide
                />
                <XAxis
                  dataKey="score"
                  type="number"
                  domain={[0, max]}
                  hide
                  allowDataOverflow
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="line" />}
                />
                <Bar
                  dataKey="score"
                  layout="vertical"
                  fill="var(--color-desktop)"
                  radius={5}
                >
                  {chartData.map((_, index) => (
                    <Cell key={index} fill={colors[index % colors.length]} />
                  ))}
                  <LabelList
                    dataKey="school_name"
                    position="left"
                    offset={8}
                    fontSize={13}
                    className="font-bold"
                  />
                  <LabelList
                    dataKey="score"
                    position="right"
                    offset={8}
                    className="fill-foreground"
                    fontSize={13}
                  />
                </Bar>
              </BarChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
        </Card>
      )}
    </div>
  );
};
