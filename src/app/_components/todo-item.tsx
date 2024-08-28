import { Button } from "@/components/ui/button";
import { CycleTimeType, Unit } from "@/lib/enum";
import { cn } from "@/lib/utils";
import { TodayDayTodo } from "@/types";
import axios from "axios";
import { LoaderCircle, Square, SquareCheckBig } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const TodoItem = ({
  todo,
  onClickTitle,
  switchDrawer,
}: {
  todo: TodayDayTodo;
  onClickTitle: (todo: TodayDayTodo) => void;
  switchDrawer: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [completed, setCompleted] = useState(todo.completed);

  useEffect(() => {
    setCompleted(todo.completed);
  }, [todo]);

  const handleClickButton = async () => {
    onClickTitle(todo);
    if (completed) {
      setLoading(true);
      try {
        await axios.delete(`/api/records/${todo.id}`);
        router.refresh();
        setCompleted(false);
      } catch (error) {
        toast.error("服务器异常");
      } finally {
        setLoading(false);
      }
    } else {
      switchDrawer();
    }
  };
  return (
    <div className="border rounded py-2 px-3">
      <div className=" w-full flex justify-between items-center">
        <Link href={`/habits/${todo.habitId}`}>
          <h2 className={cn("text-md", completed && "line-through text-gray-500")}>{`${
            CycleTimeType[Number(todo.cycleTimeType)]
          }${todo.action} ${todo.amount} ${Unit[Number(todo.unit)]}`}</h2>
        </Link>

        <Button
          onClick={handleClickButton}
          variant="link"
          size="icon"
          className="h-auto w-auto"
        >
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : completed ? (
            <SquareCheckBig />
          ) : (
            <Square className="text-gray-500" />
          )}
        </Button>
      </div>
      {todo.completed && (
        <div className="pt-2 mt-2 text-right border-t border-gray-200">
          实际完成：
          <span className="text-black font-bold">{todo.actualAmount}</span>
          &nbsp;{Unit[Number(todo.unit)]}
        </div>
      )}
    </div>
  );
};
