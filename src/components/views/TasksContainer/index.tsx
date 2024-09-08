import { TasksContentTitles } from "./TasksContentTitles";
import { TaskRow } from "./TaskRow";
import { statusOptions, Task, checkedTasks } from "../../types/tasksData";
import { useMemo } from "react";

type TasksContainerProps = {
  tasks: Task[];
  sortStatus: statusOptions;
  searchValue: string;
  updateTaskData: (updateTask: Task, taskId: number) => void;
  checkedTasks: checkedTasks[];
  updateCheckedTasksData: (updateCheckedTasks: checkedTasks[]) => void;
};

export const TasksContainer = ({
  tasks,
  sortStatus,
  searchValue,
  updateTaskData,
  checkedTasks,
  updateCheckedTasksData,
}: TasksContainerProps) => {
  const sortedTasks = useMemo((): Task[] => {
    if (sortStatus === "allStatuses" && searchValue === "") return tasks;

    const updateTasks = tasks.map((task) => {
      return {
        ...task,
        subTasks: task.subTasks.filter(
          (subTask) =>
            (subTask.status === sortStatus || sortStatus === "allStatuses") &&
            subTask.title.includes(searchValue)
        ),
      };
    });

    return updateTasks.filter((task) => {
      return (
        ((task.status === sortStatus || sortStatus === "allStatuses") &&
          task.title.includes(searchValue)) ||
        task.subTasks.length > 0
      );
    });
  }, [sortStatus, searchValue, tasks]);

  const handleCheckedTask = (
    taskId: number,
    checkedStatus: boolean,
    type: "task" | "subTask",
    parentId: number
  ) => {
    let updateCheckedTasks = [...checkedTasks];
    if (checkedStatus) {
      updateCheckedTasks = [
        ...updateCheckedTasks,
        { id: taskId, type: type, parentId: parentId },
      ];
    } else {
      updateCheckedTasks = [...updateCheckedTasks].filter(
        (task) => taskId !== task.id
      );
    }
    updateCheckedTasksData(updateCheckedTasks);
  };

  return (
    <>
      <TasksContentTitles />
      <div className="tasksContainer">
        {sortedTasks.map((task) => (
          <TaskRow
            key={task.id}
            checkedTasks={checkedTasks}
            updateTaskData={updateTaskData}
            task={task}
            handleCheckedTask={handleCheckedTask}
            sortStatus={sortStatus}
          />
        ))}
      </div>
    </>
  );
};
