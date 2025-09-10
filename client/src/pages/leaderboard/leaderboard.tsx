import React, { useState, useEffect } from "react";
import type {
  ChartConfig
} from "@/components/ui/chart"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { TrendingUp } from "lucide-react"

import { BarChart, Bar , CartesianGrid, LabelList, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getAllContestants, getAllSchools } from "@/services/contestantService";
import type { School } from "@/models/school";
import type { Contestant } from "@/models/contestant";
const Leaderboard: React.FC = () => {

  const [schools, setSchools] = useState<School[]>([]);
  const [selectedSchool, setSelectedSchool] = useState<string>("");
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
    getAllContestants()
      .then((res: Contestant[]) => {
        setContestants(res);
      })
      
  };

const chartData = [
  { team: "1", score: 186, mobile: 80 },
  { team: "2", score: 305, mobile: 200 },
  { team: "3", score: 237, mobile: 120 },
  { team: "4", score: 73, mobile: 190 },
  { team: "5", score: 209, mobile: 130 },
  { team: "6", score: 214, mobile: 140 },
]

const chartConfig = {
  desktop: {
    label: "score",
    color: "var(--chart-2)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
  label: {
    color: "var(--background)",
  },
} satisfies ChartConfig

  return (
    <div>
    <Card className="w-full max-w-3xl mx-auto mt-10 text-lg">
      <CardHeader>
        <CardTitle>Leaderboard</CardTitle>
        <CardDescription>June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
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
            <XAxis dataKey="score" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="score"
              layout="vertical"
              fill="var(--color-desktop)"
              radius={4}
            >
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
      <CardFooter className="flex-col items-start gap-2 text-sm">

      </CardFooter>
    </Card>
    </div>

  );
};

export default Leaderboard;
