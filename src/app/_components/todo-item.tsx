import { Button } from "@/components/ui/button";
import { TodayDayTodo, TodoWithHabit } from "@/types";
import { Todo } from "@prisma/client";
import { Square, SquareCheckBig } from "lucide-react";
import Link from "next/link";

export const TodoItem = ({todo, onClickButton}: {todo: TodayDayTodo, onClickButton: (todo: TodayDayTodo) => void}) => {
  return (
    <div className="flex justify-between items-center border rounded-md py-2 px-3">
      <Link href={`/habits/${todo.habitId}`}>
        <h2 className="text-md">{`${todo.cycleTimeType}${todo.action} ${todo.amount} ${todo.unit}`}</h2>
      </Link>

      <Button
        onClick={() => onClickButton(todo)}
        variant="link"
        size="icon"
        className="h-auto"
      >
        {todo.completed ? <SquareCheckBig /> : <Square className="text-gray-500" />}
      </Button>
    </div>
  );
};
