import { useMutation } from '@apollo/client';
import { StatusOptions, Task, CheckedTask, TasksTypes } from '../../../types';
import { UPDATE_SUBTASK, UPDATE_TASK } from '../../../apollo';
import { TasksContentTitles } from './TasksContentTitles';
import { TaskRow } from './TaskRow';

type TasksContainerProps = {
  displayTasks: Task[] | undefined;
  sortStatus: StatusOptions;
  checkedTasks: CheckedTask[];
  refetchTasks: (updateTasks: Task[]) => void;
  manageTasksSelection: (
    taskId: number,
    checkedStatus: boolean,
    type: TasksTypes,
    parentId: number
  ) => void;
};

export const TasksContainer = ({
  displayTasks,
  sortStatus,
  checkedTasks,
  refetchTasks,
  manageTasksSelection,
}: TasksContainerProps) => {
  const [updateSubTask] = useMutation(UPDATE_SUBTASK, {
    onCompleted: refetchTasks,
  });

  const [updateTask] = useMutation(UPDATE_TASK, {
    onCompleted: refetchTasks,
  });

  const isTaskChecked = (taskId: number, parentId: number) =>
    checkedTasks.some((task) => task.id == taskId && task.parentId == parentId);

  const updateTaskData = async (
    task: Task,
    updatedTaskId: number
  ) => {
    await updateTask({
      variables: {
        ...task,
        id: updatedTaskId
      },
    });
  };
  return (
    <>
      <TasksContentTitles />
      <div className="tasksContainer">
        {displayTasks?.map((task) => (   
          <TaskRow
            key={task.id}
            isTaskChecked={isTaskChecked(task.id, -1)}
            updateTaskData={updateTaskData}
            updateSubTask={updateSubTask}
            task={task}
            manageTasksSelection={manageTasksSelection}
            sortStatus={sortStatus}
            checkedSubTasks={checkedTasks.filter((subTask) => subTask.parentId === task.id)}
          />
        ))}
      </div>
    </>
  );
};
