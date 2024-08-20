import { Button } from "@/components/ui/button";
import { CycleTimeType, Unit } from "@/lib/enum";
import { TodayDayTodo, TodoWithHabit } from "@/types";
import { Todo } from "@prisma/client";
import { LoaderCircle, Square, SquareCheckBig } from "lucide-react";
import Link from "next/link";

export const TodoItem = ({todo, onClickButton, deleting}: {todo: TodayDayTodo, onClickButton: (todo: TodayDayTodo) => void, deleting: boolean}) => {
  return (
    <div className="flex justify-between items-center border rounded-md py-2 px-3">
      <Link href={`/habits/${todo.habitId}`}>
        <h2 className="text-md">{`${CycleTimeType[Number(todo.cycleTimeType)]}${todo.action} ${todo.amount} ${Unit[Number(todo.unit)]}`}</h2>
      </Link>

      <Button
        onClick={() => onClickButton(todo)}
        variant="link"
        size="icon"
        className="h-auto"
      >
        {
          deleting ? <LoaderCircle className="animate-spin" /> :
          todo.completed ? <SquareCheckBig /> : <Square className="text-gray-500" />
        }
      </Button>
    </div>
  );
};
