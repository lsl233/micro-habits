"use client";

import { OneDayTodo } from "@/types";
import { TodoItem } from "./todo-item";
import CompleteDrawer from "./complete-drawer";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export const TodoList = ({ todoList }: { todoList: OneDayTodo[] }) => {
  const router = useRouter();
  const [completeDrawerOpen, setCompleteDrawerOpen] = useState(false);
  const [activeHabitId, setActiveHabitId] = useState<string>("");

  const handleSwitchDrawer = () => {
    setCompleteDrawerOpen(!completeDrawerOpen);
  };

  const handleClickButton = async (
    habitId: string,
    completed: boolean,
    todoId?: string
  ) => {
    setActiveHabitId(habitId);
    if (completed) {
      if (todoId) {
        await axios.patch(`/api/todo/${todoId}`, {
          completed: true,
        });
        router.refresh();
      }
    } else {
      handleSwitchDrawer();
    }
  };

  return (
    <>
      {todoList.map((item, index) => (
        <TodoItem key={index} {...item} onClickButton={handleClickButton} />
      ))}
      <CompleteDrawer
        habitId={activeHabitId}
        open={completeDrawerOpen}
        onSwitchDrawer={handleSwitchDrawer}
      />
    </>
  );
};
