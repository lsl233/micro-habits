import { Todo } from "@prisma/client";
import { Optional } from "@prisma/client/runtime/library";

export interface OneDayTodo
  extends Optional<Todo, "id" | "createdAt" | "updatedAt"> {
  title: string;
}
