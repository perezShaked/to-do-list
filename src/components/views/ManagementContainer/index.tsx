import './ManageContainer.css';
import { SearchBar } from './SearchBar';
import { SortButton } from './SortButton';
import { DeleteTaskButton } from './DeleteTaskButton';
import { NewTaskButton } from './NewTaskButton';
import { Task, CheckedTask, StatusOptions, TasksTypes } from '../../../types';
import { useState, useMemo } from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_SUB_TASK, DELETE_TASK } from '../../../services';

type ManagementContainerProps = {
  tasks: Task[] | undefined;
  checkedTasks: CheckedTask[];
  sortStatus: StatusOptions;
  searchValue: string;
  updateTasksData: (updateTasks: Task[]) => void;
  updateCheckedTasksData: (updateCheckedTasks: CheckedTask[]) => void;
  handleSearchValueChange: (value: string) => void;
  handleSortStatusChange: (status: StatusOptions) => () => void;
};

export const ManagementContainer = ({
  tasks,
  checkedTasks,
  updateTasksData,
  sortStatus,
  searchValue,
  updateCheckedTasksData,
  handleSearchValueChange,
  handleSortStatusChange,
}: ManagementContainerProps) => {
  const [deleteTask] = useMutation(DELETE_TASK, {
    onCompleted: updateTasksData,
  });
  const [deleteSubTask] = useMutation(DELETE_SUB_TASK, {
    onCompleted: updateTasksData,
  });
  /* const [nextId, setNextId] = useState(tasks.length); */

  /*   const addNewSubTask = ({ subTasks }: Task) => {
    let nextSubTaskId = 0;
    if (subTasks.length > 0) {
      nextSubTaskId = subTasks[subTasks.length - 1].id + 1;
    }
    subTasks.push({
      id: nextSubTaskId,
      title: '',
      status: StatusOptions.PENDING_UPDATE,
    });
  }; */

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

  const isSubTaskChecked = useMemo(() => {
    checkedTasks.forEach(({ type }) => {
      if (type == TasksTypes.SUB_TASK) {
        return true;
      }
    });
    return false;
  }, [checkedTasks]);

  return (
    <div className="manageContainer">
      <div className="searchAndSort">
        <SearchBar value={searchValue} onChange={handleSearchValueChange} />
        <SortButton onClick={handleSortStatusChange} sortStatus={sortStatus} />
      </div>
      <div className="addAndDelete">
        <DeleteTaskButton onClick={handleDeleteTask} />
        <NewTaskButton disabled={isSubTaskChecked} checkedTasks={checkedTasks} />
      </div>
    </div>
  );
};
