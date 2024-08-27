"use client";

import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dayjs from "dayjs";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { RecordWithHabit } from "@/types";
import Select from "@/components/ui/wrap/select";
import { Habit } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";

const chartConfig = {
  amount: {
    label: "完成数量",
    color: "hsl(var(--chart-1))",
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig;

const Chart = ({
  records,
  habits,
}: {
  records: RecordWithHabit[];
  habits: Habit[];
}) => {
  const [chartData, setChartData] = useState<
    { date: string; amount: number }[]
  >([]);
  const [selectData, setSelectData] = useState<{ id: string; name: string }[]>(
    []
  );
  const [selectedHabitId, setSelectedHabitId] = useState<string>("");
  useEffect(() => {
    const chartData = [];
    for (const record of records) {
      if (record.habitId === selectedHabitId) {
        chartData.push({
          date: dayjs(record.createdAt).format("YYYY-MM-DD"),
          amount: record.amount,
        });
      }
    }
    setChartData(chartData);
  }, [records, selectedHabitId]);

  useEffect(() => {
    const selectData = habits.map((habit) => ({
      id: habit.id,
      name: habit.action,
    }));
    setSelectData(selectData);
    if (selectData.length > 0) {
      setSelectedHabitId(selectData[0].id);
    }
  }, [habits]);

  const handleSelectChange = useCallback((value: string) => {
    setSelectedHabitId(value);
  }, []);

  return (
    <div className="w-full">
      <CardHeader className="p-0">
        <CardTitle>
          <Select
            value={selectedHabitId}
            data={selectData}
            placeholder={"选择一个习惯"}
            selectTrigger={{ className: "w-48" }}
            onChange={handleSelectChange}
          />
        </CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
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
              dataKey="date"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              hide
            />
            <XAxis dataKey="amount" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="amount"
              layout="vertical"
              fill="var(--color-amount)"
              radius={4}
              maxBarSize={30}
            >
              <LabelList
                dataKey="date"
                position="insideLeft"
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey="amount"
                position="insideRight"
                className="fill-[--color-label]"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm p-0">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </div>
  );
};

export default Chart;
