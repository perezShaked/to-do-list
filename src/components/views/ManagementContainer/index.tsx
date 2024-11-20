import { useMemo } from 'react';
import { useMutation } from '@apollo/client';
import { Task, CheckedTask, StatusOptions, TasksTypes } from '../../../types';
import { DELETE_SUB_TASK, DELETE_TASK, ADD_NEW_SUB_TASK, ADD_NEW_TASK } from '../../../services';
import { SearchBar } from './SearchBar';
import { SortButton } from './SortButton';
import { DeleteTaskButton } from './DeleteTaskButton';
import { NewTaskButton } from './NewTaskButton';
import './ManageContainer.css';

type ManagementContainerProps = {
  checkedTasks: CheckedTask[];
  sortStatus: StatusOptions;
  searchValue: string;
  refetchTasks: (updateTasks: Task[]) => void;
  updateCheckedTasksData: (updateCheckedTasks: CheckedTask[]) => void;
  handleSearchValueChange: (value: string) => void;
  handleSortStatusChange: (status: StatusOptions) => () => void;
};

export const ManagementContainer = ({
  checkedTasks,
  sortStatus,
  searchValue,
  refetchTasks,
  updateCheckedTasksData,
  handleSearchValueChange,
  handleSortStatusChange,
}: ManagementContainerProps) => {
  const [deleteTask] = useMutation(DELETE_TASK, {
    onCompleted: refetchTasks,
  });

  const [deleteSubTask] = useMutation(DELETE_SUB_TASK, {
    onCompleted: refetchTasks,
  });

  const [addNewTask] = useMutation(ADD_NEW_TASK, {
    onCompleted: refetchTasks,
  });

  const [addNewSubTask] = useMutation(ADD_NEW_SUB_TASK, {
    onCompleted: refetchTasks,
  });

  const handleDeleteTask = () => {
    checkedTasks.forEach(async ({ id, type }) => {
      if (type == TasksTypes.SUB_TASK) {
        await deleteSubTask({
          variables: {
            subTaskId: id,
          },
        });
      } else {
        await deleteTask({
          variables: {
            taskId: id,
          },
        });
      }
    });
    updateCheckedTasksData([]);
  };

  const handleAddNewTask = async () => {
    if (checkedTasks.length > 0) {
      checkedTasks.forEach(async (checkedTask) => {
        await addNewSubTask({
          variables: {
            parentTaskId: checkedTask.id,
          },
        });
      });
    } else {
      await addNewTask();
    }
  };

  const isSubTaskChecked = useMemo(() => {
    return checkedTasks.some(({ type }) => type === TasksTypes.SUB_TASK);
  }, [checkedTasks]);

  return (
    <div className="manageContainer">
      <div className="searchAndSort">
        <SearchBar onChange={handleSearchValueChange} value={searchValue} />
        <SortButton onClick={handleSortStatusChange} sortStatus={sortStatus} />
      </div>
      <div className="addAndDelete">
        <DeleteTaskButton onClick={handleDeleteTask} />
        <NewTaskButton onClick={handleAddNewTask} disabled={isSubTaskChecked} />
      </div>
    </div>
  );
};
