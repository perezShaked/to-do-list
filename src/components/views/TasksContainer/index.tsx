import { TasksContentTitles } from './TasksContentTitles';
import { TaskRow } from './TaskRow';
import { StatusOptions, Task, CheckedTask, TasksTypes } from '../../../types';
import { useTasksQuery } from '../../hooks';

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
  const tasks = useTasksQuery().data;
  const isTaskChecked = (taskId: number, parentId: number) =>
    checkedTasks.some((task) => task.id == taskId && task.parentId == parentId);

  return (
    <>
      <TasksContentTitles />
      <div className="tasksContainer">
        {tasks?.map((task) => (
          <TaskRow
            key={task.taskId}
            isTaskChecked={isTaskChecked(task.taskId, -1)}
            updateTaskData={updateTaskData}
            task={task}
            handleCheckedTask={handleCheckedTask}
            sortStatus={sortStatus}
            checkedSubTasks={checkedTasks.filter((subTask) => subTask.parentId === task.taskId)}
          />
        ))}
      </div>
    </>
  );
};
