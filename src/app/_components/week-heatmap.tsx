import { cn } from "@/lib/utils";
import { Record } from "@prisma/client";
import dayjs from "dayjs";

const WeekHeatmap = ({ records }: { records: Record[] }) => {
  const week = [
    {
      day: 1,
      completed: false,
    },
    {
      day: 2,
      completed: false,
    },
    {
      day: 3,
      completed: false,
    },
    {
      day: 4,
      completed: false,
    },
    {
      day: 5,
      completed: false,
    },
    {
      day: 6,
      completed: false,
    },
    {
      day: 7,
      completed: false,
    },
  ];

  records.forEach((record) => {
    const day = dayjs(record.createdAt).day();
    week[day - 1].completed = true;
  });

  return (
    <div className="flex gap-x-1 justify-between items-center">
      {week.map((item, index) => (
        <div key={index} className={cn("w-4 h-4 bg-gray-200 border border-gray-300/100 rounded-[2px]", item.completed && "bg-green-500 border-green-600/100")}></div>
      ))}
    </div>
  );
};

export default WeekHeatmap;
