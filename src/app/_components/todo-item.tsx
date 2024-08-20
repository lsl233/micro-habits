import { Button } from "@/components/ui/button";
import { CycleTimeType, Unit } from "@/lib/enum";
import { TodayDayTodo, TodoWithHabit } from "@/types";
import { Todo } from "@prisma/client";
import axios from "axios";
import { LoaderCircle, Square, SquareCheckBig } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export const TodoItem = ({todo, onClickTitle, switchDrawer}: {todo: TodayDayTodo, onClickTitle: (todo: TodayDayTodo) => void, switchDrawer: () => void}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClickButton = async () => {
    onClickTitle(todo)
    if (todo.completed) {
      setLoading(true);
      try {
        await axios.delete(`/api/records/${todo.id}`);
        router.refresh();
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
    <div className="flex justify-between items-center border rounded-md py-2 px-3">
      <Link href={`/habits/${todo.habitId}`}>
        <h2 className="text-md">{`${CycleTimeType[Number(todo.cycleTimeType)]}${todo.action} ${todo.amount} ${Unit[Number(todo.unit)]}`}</h2>
      </Link>

      <Button
        onClick={handleClickButton}
        variant="link"
        size="icon"
        className="h-auto"
      >
        {
          loading ? <LoaderCircle className="animate-spin" /> :
          todo.completed ? <SquareCheckBig /> : <Square className="text-gray-500" />
        }
      </Button>
    </div>
  );
};
