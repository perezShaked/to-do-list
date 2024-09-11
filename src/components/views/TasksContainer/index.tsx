import { TasksContentTitles } from "./TasksContentTitles";
import { TaskRow } from "./TaskRow";
import { StatusOptions, Task, CheckedTask, TasksTypes } from "../../../types";

type TasksContainerProps = {
  displayTasks: Task[];
  sortStatus: StatusOptions;

  checkedTasks: CheckedTask[];
  updateTaskData: (updateTask: Task, taskId: number) => void;
  handleCheckedTask: (
    taskId: number,
    checkedStatus: boolean,
    type: TasksTypes,
    parentId: number
  ) => void;
};

export const TasksContainer = ({
  displayTasks,
  sortStatus,
  updateTaskData,
  checkedTasks,
  handleCheckedTask,
}: TasksContainerProps) => {
  const isTaskChecked = (taskId: number, parentId: number) =>
    checkedTasks.some((task) => task.id == taskId && task.parentId == parentId);

  return (
    <>
      <TasksContentTitles />
      <div className="tasksContainer">
        {displayTasks.map((task) => (
          <TaskRow
            key={task.id}
            isTaskChecked={isTaskChecked(task.id, -1)}
            updateTaskData={updateTaskData}
            task={task}
            handleCheckedTask={handleCheckedTask}
            sortStatus={sortStatus}
            checkedSubTasks={checkedTasks.filter((subTask) => subTask.parentId === task.id)}
          />
        ))}
      </div>
    </>
  );
};
