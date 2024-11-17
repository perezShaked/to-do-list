import { TasksContentTitles } from './TasksContentTitles';
import { TaskRow } from './TaskRow';
import { StatusOptions, Task, CheckedTask, TasksTypes } from '../../../types';
import { useTasksQuery } from '../../hooks';
import { useMutation } from '@apollo/client';
import { UPDATE_SUBTASK } from '../../../services';

type TasksContainerProps = {
  displayTasks: Task[] | undefined;
  sortStatus: StatusOptions;
  checkedTasks: CheckedTask[];
  updateTaskData: (updateTask: Task, taskId: number) => void;
  refetchTasks: (updateTasks: Task[]) => void;
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
  refetchTasks,
}: TasksContainerProps) => {
  /*   const tasks = useTasksQuery().data; */
  const isTaskChecked = (taskId: number, parentId: number) =>
    checkedTasks.some((task) => task.id == taskId && task.parentId == parentId);
  const [updateSubTask] = useMutation(UPDATE_SUBTASK, {
    onCompleted: refetchTasks,
  });

  return (
    <>
      <TasksContentTitles />
      <div className="tasksContainer">
        {displayTasks?.map((task) => (
          <TaskRow
            key={task.taskId}
            isTaskChecked={isTaskChecked(task.taskId, -1)}
            updateTaskData={updateTaskData}
            updateSubTask={updateSubTask}
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
