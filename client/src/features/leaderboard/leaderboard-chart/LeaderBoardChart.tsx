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

interface LeaderBoardChartProps {
  data: Score[];
}

export const LeaderBoardChart: React.FC<LeaderBoardChartProps> = ({ data }) => {
  const [chartData, setChartData] = useState<Score[]>([...data]);
  const [max, setMax] = useState<number>(0);
  const { comp } = useCompetition();

  // Refresh leaderboard every 15s
  useEffect(() => {
    chartData.sort((a, b) => b.score - a.score);
    setMax(chartData[0].score * 1.2);
  }, []);

  const getLeaderboardData = () => {
    getLeaderboard(comp.id)
      .then((res: Score[]) => {
        setChartData(res.sort((a, b) => b.score - a.score));
      })
      .catch(console.error);
  };

  // Refresh leaderboard every 15s
  useEffect(() => {
    const interval = setInterval(getLeaderboardData, 10000);

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
      color: "var(--background)",
    },
  } satisfies ChartConfig;

  return (
    <div>
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
                  fontSize={12}
                />
                <LabelList
                  dataKey="score"
                  position="right"
                  offset={8}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm"></CardFooter>
      </Card>
    </div>
  );
};
