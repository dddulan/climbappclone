import React from "react";
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

interface LeaderBoardChartProps {
  data: Score[];
}

export const LeaderBoardChart: React.FC<LeaderBoardChartProps> = ({ data }) => {
  // Transform the API data to chart format
  const chartData = data
    .map((item) => ({
      team: item.school_name || "",
      score: item.score || 0,
    }))
    .sort((a, b) => b.score - a.score); // Sort by score descending

  const max = chartData[0].score * 1.2;

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
      <Card className="w-100vh">
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={chartData}
              layout="vertical"
              margin={{
                left: 0,
              }}
            >
              <CartesianGrid horizontal={false} />
              <YAxis
                dataKey="team"
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
                  dataKey="team"
                  position="insideLeft"
                  offset={8}
                  className="fill-(--color-label)"
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
