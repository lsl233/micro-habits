"use client";

import { Unit, Type } from "@/lib/enum";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Square, SquareCheckBig, SquareMinus } from "lucide-react";
import { Habit } from "@prisma/client";

const HabitItem = ({
  habit,
  onCancelComplete: onCancelComplete,
  onOpenCompleteDrawer: onOpenCompleteDrawer,
}: {
  habit: {habitId: string, completed: boolean, amount: string | number};
  onCancelComplete: (habitId: string) => void;
  onOpenCompleteDrawer: (habit: Habit) => void;
}) => {
  const handleClick = () => {
    if (habit.completed) {
      onCancelComplete(habit.id);
    } else {
      onOpenCompleteDrawer(habit);
    }
  }

  return (
    <div className="flex justify-between items-center border rounded-md py-2 px-3">
      <Link href={`/habits/${habit.id}`}>
        <h2 className="text-md">
          {habit.type !== undefined ? Type[habit.type] : ""}
          {habit.title} {habit.amount}{" "}
          {habit.unit !== undefined ? Unit[habit.unit] : ""}
        </h2>
      </Link>

      <Button onClick={handleClick} variant="link" size="icon" className="h-auto">
        {habit.completed ? <SquareCheckBig /> : <Square className="text-gray-500" />}
      </Button>
    </div>
  );
};

export default HabitItem;
