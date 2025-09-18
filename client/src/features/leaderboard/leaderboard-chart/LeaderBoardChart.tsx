import React, {useContext} from "react";
import { BarChart, Bar , CartesianGrid, LabelList, XAxis, YAxis, Cell } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type {
  ChartConfig
} from "@/components/ui/chart"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { CompContext } from "@/components/layout/layout";


export const LeaderBoardChart: React.FC = () => {

  const ctx = useContext(CompContext)!;


    const chartData = [
  { team: "Duncan", score: 52560, mobile: 80 },
  { team: "Fresno", score: 30005, mobile: 200 },
  { team: "Design Science", score: 22237, mobile: 120 },
  { team: "Bullard", score: 73000, mobile: 190 },
  { team: "Edison", score: 20900, mobile: 130 },
  { team: "Hoover", score: 21400, mobile: 140 },
]

const colors = ["#3b82f6", "#f97316", "#10b981", "#ef4444","#8b5cf6","#eab308","#14b8a6","#f43f5e","#22d3ee"]


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


    return(
        <div>
<Card >
      <CardHeader>
        <CardTitle>Leaderboard</CardTitle>
        <CardDescription>        
          {(ctx?.comp.id) ? (
          <h2>{ctx.comp.date_of}</h2>
        ) : (
          <h2>No active competition</h2>
        )}
        </CardDescription>
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
                {chartData.map((_, index) => (
    <Cell
      key={index}
      fill={colors[index % colors.length]}
    />
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
      <CardFooter className="flex-col items-start gap-2 text-sm">

      </CardFooter>
    </Card>
    </div>
    );


    
};