"use client";

import { TodayDayTodo } from "@/types";
import { TodoItem } from "./todo-item";
import CompleteDrawer from "./complete-drawer";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const TodoList = ({ todoList }: { todoList: TodayDayTodo[] }) => {
  const router = useRouter();
  const [completeDrawerOpen, setCompleteDrawerOpen] = useState(false);
  const [activeTodo, setActiveTodo] = useState<TodayDayTodo>();
  const [deleting, setDeleting] = useState(false);

  const switchDrawer = () => {
    setCompleteDrawerOpen(!completeDrawerOpen);
  };

  return (
    <>
      {todoList.map((item, index) => (
        <TodoItem
          key={index}
          todo={item}
          onClickTitle={setActiveTodo}
          switchDrawer={switchDrawer}
        />
      ))}
      <CompleteDrawer
        todo={activeTodo}
        open={completeDrawerOpen}
        switchDrawer={switchDrawer}
      />
    </>
  );
};
