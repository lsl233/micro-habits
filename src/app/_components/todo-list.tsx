"use client";

import { OneDayTodo, TodayDayTodo, TodoWithHabit } from "@/types";
import { TodoItem } from "./todo-item";
import CompleteDrawer from "./complete-drawer";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Todo } from "@prisma/client";

export const TodoList = ({ todoList }: { todoList: TodayDayTodo[] }) => {
  const router = useRouter();
  const [completeDrawerOpen, setCompleteDrawerOpen] = useState(false);
  const [activeTodo, setActiveTodo] = useState<TodayDayTodo>();

  const handleSwitchDrawer = () => {
    setCompleteDrawerOpen(!completeDrawerOpen);
  };

  const handleClickButton = async (todo: TodayDayTodo) => {
    setActiveTodo(todo);
    if (todo.completed) {
      await axios.delete(`/api/records/${todo.id}`);
      router.refresh();
    } else {
      handleSwitchDrawer();
    }
  };

  return (
    <>
      {todoList.map((item, index) => (
        <TodoItem key={index} todo={item} onClickButton={handleClickButton} />
      ))}
      <CompleteDrawer
        todo={activeTodo}
        open={completeDrawerOpen}
        onSwitchDrawer={handleSwitchDrawer}
      />
    </>
  );
};
