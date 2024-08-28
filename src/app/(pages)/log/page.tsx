import { db } from "@/lib/db";
import { CycleTimeType, Unit } from "@/lib/enum";
import { RecordWithHabit } from "@/types";
import dayjs from "dayjs";

const LogPage = async () => {
  const records: RecordWithHabit[] = await db.record.findMany({
    include: {
      habit: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <ul className="w-full">
      {records.map((item) => (
        <li
          key={item.id}
          className="border-b border-gray-200 py-1 text-gray-600 flex justify-between items-center"
        >
          <div>
            <div className="text-gray-500 text-sm">{dayjs(item.createdAt).format("YYYY-MM-DD")}</div>
            {CycleTimeType[Number(item.habit.cycleTimeType)]}
            {item.habit.action} {item.habit.amount}{" "}
            {Unit[Number(item.habit.unit)]}
          </div>
          <div className="flex-shrink-0 ml-4 text-right">
            <div className="text-gray-500 text-sm">实际完成</div>
            <span className="text-xl text-black">{item.amount}</span>{" "}
            {Unit[Number(item.habit.unit)]}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default LogPage;
