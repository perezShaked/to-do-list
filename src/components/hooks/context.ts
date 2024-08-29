import { Task } from "../types/tasksData";
import { createContext } from "react";

interface MyContextType {
  task: Task;
  setTask: React.Dispatch<React.SetStateAction<Task>>;
}

export const taskContext = createContext<MyContextType|undefined>(undefined)