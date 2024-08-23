"use server";

import { db } from "@/lib/db";
import Chart from "./_components/chart";
import { RecordWithHabit } from "@/types";

const RecordsPage = async () => {
  const records: RecordWithHabit[] = await db.record.findMany({
    include: {
      habit: true,
    },
  });

  return <Chart records={records} />;
};

export default RecordsPage;
