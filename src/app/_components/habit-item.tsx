"use client";

import { Storage } from "@/lib/storage";
import { Checkbox } from "@/components/ui/checkbox";
import { Habit } from "@/types/habit";
import { Unit, Type } from "@/lib/enum";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SquareCheckBig, SquareMinus } from "lucide-react";

const HabitItem = ({
  habit,
  onChange: onChange,
}: {
  habit: Habit;
  onChange: (habit: Habit, checked: boolean) => void;
}) => {
  console.log(Unit);
  return (
    <div className="flex justify-between items-center border rounded-md py-2 px-3">
      <Link href={`/habits/${habit.id}`}>
        <h2 className="text-md">
          {habit.type !== undefined ? Type[habit.type] : ""}
          {habit.title} {habit.count}{" "}
          {habit.unit !== undefined ? Unit[habit.unit] : ""}
        </h2>
      </Link>
      <Button variant="link" size="icon" className="h-auto">
        {habit.completed ? <SquareMinus className="text-gray-500" /> : <SquareCheckBig />}
      </Button>
    </div>
  );
};

export default HabitItem;
