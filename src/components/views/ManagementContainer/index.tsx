import './ManageContainer.css';
import { SearchBar } from './SearchBar';
import { SortButton } from './SortButton';
import { DeleteTaskButton } from './DeleteTaskButton';
import { NewTaskButton } from './NewTaskButton';
import { Task, CheckedTask, StatusOptions, TasksTypes } from '../../../types';
import { useState, useMemo } from 'react';

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

  /*   const createNewTask = (): Task => {
    return {
      id: nextId,
      title: '',
      dueDate: new Date(),
      madeBy: '',
      owner: '',
      status: StatusOptions.PENDING_UPDATE,
      subTasks: [],
    };
  }; */

  const handleDeleteTask = () => {
    console.log('try to delete');

    /*    let updatedTasks = [...tasks];
    checkedTasks.forEach(({ parentId, id, type }) => {
      if (type == TasksTypes.SUB_TASK) {
        updatedTasks = updatedTasks.map((task) => {
          if (task.id == parentId) {
            return {
              ...task,
              subTasks: task.subTasks.filter((task) => task.subTaskId !== id),
            };
          }
          return task;
        });
      } else {
        updatedTasks = updatedTasks.filter((task) => task.id !== id);
      }
    });
    updateTasksData(updatedTasks);
    updateCheckedTasksData([]); */
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
