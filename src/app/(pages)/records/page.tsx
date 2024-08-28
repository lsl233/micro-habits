import { db } from "@/lib/db";
import Chart from "./_components/chart";
import { RecordWithHabit } from "@/types";
import HabitSelect from "./_components/habit-select";
import Select from "@/components/ui/wrap/select";
import { Habit } from "@prisma/client";

const RecordsPage = async () => {
  const records: RecordWithHabit[] = await db.record.findMany({
    include: {
      habit: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const habits = await db.habit.findMany();

  return (
    <>
      <Chart records={records} habits={habits} />
    </>
  );
};

export default RecordsPage;
