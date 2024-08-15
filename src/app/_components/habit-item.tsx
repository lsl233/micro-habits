"use client";

import { Storage } from "@/lib/storage";
import { Checkbox } from "@/components/ui/checkbox";
import { Habit } from "@/types/habit";
import { useRouter } from "next/navigation";
import Link from "next/link";

const HabitItem = ({ habit }: { habit: Habit }) => {
  const router = useRouter();
  const handleChange = (checked: boolean) => {
    Storage.setItem<Habit>("habits", (item) => {
      if (item.id === habit.id) {
        item.completed = checked;
        return true;
      }
      return false;
    });
    router.refresh();
  };
  return (
    <div className="flex justify-between items-center border rounded-md py-2 px-3">
      <Link href={`/habits/${habit.id}`}>
        <h2 className="text-md">
          {habit.type}
          {habit.title} {habit.count} {habit.unit}
        </h2>
      </Link>
      <Checkbox onCheckedChange={handleChange} />
    </div>
  );
};

export default HabitItem;
