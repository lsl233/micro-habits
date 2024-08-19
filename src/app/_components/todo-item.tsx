import { Button } from "@/components/ui/button";
import { OneDayTodo } from "@/types";
import { Square, SquareCheckBig } from "lucide-react";
import Link from "next/link";

interface Props extends OneDayTodo {
  onClickButton: (habitId: string, completed: boolean, todoId?: string) => void;
}

export const TodoItem = (props: Props) => {
  return (
    <div className="flex justify-between items-center border rounded-md py-2 px-3">
      <Link href={`/habits/${props.habitId}`}>
        <h2 className="text-md">{props.title}</h2>
      </Link>

      <Button
        onClick={() => props.onClickButton(props.habitId, props.completed, props.id)}
        variant="link"
        size="icon"
        className="h-auto"
      >
        {props.completed ? <SquareCheckBig /> : <Square className="text-gray-500" />}
      </Button>
    </div>
  );
};
