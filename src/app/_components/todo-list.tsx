"use client";

import { OneDayTodo, TodayDayTodo, TodoWithHabit } from "@/types";
import { TodoItem } from "./todo-item";
import CompleteDrawer from "./complete-drawer";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Todo } from "@prisma/client";
import toast from "react-hot-toast";

export const TodoList = ({ todoList }: { todoList: TodayDayTodo[] }) => {
  const router = useRouter();
  const [completeDrawerOpen, setCompleteDrawerOpen] = useState(false);
  const [activeTodo, setActiveTodo] = useState<TodayDayTodo>();
  const [deleting, setDeleting] = useState(false);

  const handleSwitchDrawer = () => {
    setCompleteDrawerOpen(!completeDrawerOpen);
  };

  const handleClickButton = async (todo: TodayDayTodo) => {
    setActiveTodo(todo);
    if (todo.completed) {
      if (deleting) return
      
      setDeleting(true);
      try {
        await axios.delete(`/api/records/${todo.id}`);
        router.refresh();
      } catch (error) {
        toast.error("服务器异常");
      } finally {
        setDeleting(false);
      }
    } else {
      handleSwitchDrawer();
    }
  };

  return (
    <>
      {todoList.map((item, index) => (
        <TodoItem
          key={index}
          todo={item}
          onClickButton={handleClickButton}
          deleting={deleting}
        />
      ))}
      <CompleteDrawer
        todo={activeTodo}
        open={completeDrawerOpen}
        onSwitchDrawer={handleSwitchDrawer}
      />
    </>
  );
};
