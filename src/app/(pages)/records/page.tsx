import { db } from "@/lib/db";
import Chart from "./_components/chart";
import { RecordWithHabit } from "@/types";
import { auth } from "@/app/auth";

const RecordsPage = async () => {
  const session = await auth();
  const records: RecordWithHabit[] = await db.record.findMany({
    where: {
      userId: session?.user?.id,
    },
    include: {
      habit: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const habits = await db.habit.findMany({
    where: {
      userId: session?.user?.id,
    },
  });

  return (
    <>
      <Chart records={records} habits={habits} />
    </>
  );
};

export default RecordsPage;
