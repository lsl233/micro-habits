import { db } from "@/lib/db";
import HabitForm from "./_components/habit-form";
import { Habit } from "@prisma/client";

const HabitsIdPage = async ({ params }: { params: { habitsId: string } }) => {
  const habitsId = params?.habitsId?.[0];
  let habit: Habit | undefined;
  if (habitsId) {
    try {
      habit = await db.habit.findUnique({
        where: { id: habitsId },
      }) || undefined;
    } catch(e) {
      console.error(e)
    }
  }
  return (
    <HabitForm habit={habit} />
  );
};

export default HabitsIdPage;
