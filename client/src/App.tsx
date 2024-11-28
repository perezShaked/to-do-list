import { useState, useMemo } from 'react';
import {
  TimeStamp,
  TasksContainer,
  ManagementContainer,
} from './components';
import { useStatusesQuery, useTasksQuery } from './hooks';
import { CheckedTask, Task, StatusOptions, TasksTypes } from './types';
import { statusesContext } from '../src/context';
import './App.css';

const App = () => {
  const [checkedTasks, setCheckedTasks] = useState<CheckedTask[]>([]);
  const [sortStatus, setSortStatus] = useState<StatusOptions>(StatusOptions.ALL_STATUSES);
  const [searchValue, setSearchValue] = useState<string>('');
  const allTasks = useTasksQuery();

  const displayTasks = useMemo((): Task[] | undefined => {
    if (sortStatus === StatusOptions.ALL_STATUSES && searchValue === '') return allTasks.data;

    const sortedTasks = allTasks.data?.map((task) => {
      return {
        ...task,
        subTasks: task.subTasks.filter(
          (subTask) =>
            (subTask.statusId === sortStatus || sortStatus === StatusOptions.ALL_STATUSES) &&
            subTask.title.includes(searchValue)
        ),
      };
    });

    return sortedTasks?.filter((task) => {
      return (
        (task && task.subTasks && task.subTasks.length > 0) ||
        ((task.statusId === sortStatus || sortStatus === StatusOptions.ALL_STATUSES) &&
          task.title.includes(searchValue))
      );
    });
  }, [sortStatus, searchValue, allTasks.data, allTasks.tasksLoading]);

  const handleSortStatusChange = (status: StatusOptions) => () => {
    if (status !== sortStatus) setSortStatus(status);
  };

  const handleSearchValueChange = (value: string) => {
    setSearchValue(value);
  };

  const manageTasksSelection = (
    taskId: number,
    checked: boolean,
    type: TasksTypes,
    parentId: number
  ) => {
    let updatedCheckedTasks = [...checkedTasks];
    if (checked) {
      updatedCheckedTasks = [
        ...updatedCheckedTasks,
        { id: taskId, type: type, parentId: parentId },
      ];
    } else {
      updatedCheckedTasks = [...updatedCheckedTasks].filter(
        (task) => taskId !== task.id || parentId !== task.parentId
      );
    }
    setCheckedTasks(updatedCheckedTasks);
  };

  return (
    <>
      <TimeStamp />.
      <statusesContext.Provider value={useStatusesQuery().data}>
        <div className="appContainer">
          <div className="header">משימות</div>
          <ManagementContainer
            searchValue={searchValue}
            sortStatus={sortStatus}
            checkedTasks={checkedTasks}
            refetchTasks={allTasks.tasksRefetch}
            updateCheckedTasksData={setCheckedTasks}
            handleSearchValueChange={handleSearchValueChange}
            handleSortStatusChange={handleSortStatusChange}
          />
          <TasksContainer
            sortStatus={sortStatus}
            checkedTasks={checkedTasks}
            refetchTasks={allTasks.tasksRefetch}
            displayTasks={displayTasks}
            manageTasksSelection={manageTasksSelection}
          />
        </div>
      </statusesContext.Provider>
    </>
  );
};

export default App;
