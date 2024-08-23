"use client";

import dayjs from "dayjs";
import * as echarts from "echarts/core";
import { BarChart, LineChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  // 数据集组件
  DatasetComponent,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent,
} from "echarts/components";
import { LabelLayout, UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import type {
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption,
  LineSeriesOption,
} from "echarts/charts";
import type {
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  TooltipComponentOption,
  GridComponentOption,
  DatasetComponentOption,
} from "echarts/components";
import type { ComposeOption } from "echarts/core";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>;

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LineChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
]);

import { Record } from "@prisma/client";
import { RecordWithHabit } from "@/types";
import { CycleTimeType, Unit } from "@/lib/enum";


const Chart = ({ records }: { records: RecordWithHabit[] }) => {
  const chartRef = useRef(null);

  const generateDataset = () => {
    const dataMap: {[key: string]: RecordWithHabit[]} = {}
    for (const record of records) {
      console.log(record);
      const todo = record.habit
      const title = `${CycleTimeType[Number(todo.cycleTimeType)]}${todo.action} ${todo.amount} ${Unit[Number(todo.unit)]}`
      if (dataMap.title) {
        dataMap[title].push(record)
      } else {
        dataMap[title] = [record]
      }
    }
  };

  useEffect(() => {
    console.log(records);

    const result = {};

    const dataset = records.map((record) => {
      return {
        type: "bar",
        name: dayjs(record.createdAt).format("YYYY-MM-DD"),
        value: record.amount,
      };
    });
    const option: ECOption = {
      xAxis: {
        type: "time",
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          type: "bar",
          data: [10, 20, 30, 40, 50, 60, 70],
        },
      ],
    };
    echarts.init(chartRef.current).setOption(option);
  }, []);

  return <div ref={chartRef} className="w-full h-[300px]"></div>;
};

export default Chart;
