import './App.css';
import { useState, useMemo, useEffect } from 'react';
import { TimeStamp } from './components/views/TimeStamp';
import { CheckedTask, Task, StatusOptions, TasksTypes } from './types';
import { TasksContainer } from './components/views/TasksContainer';
import { ManagementContainer } from './components/views/ManagementContainer';
import { useStatusesQuery, useTasksQuery } from './components/hooks';
import { statusesContext } from './context';
import { UPDATE_TASK } from './services';
import { useMutation } from '@apollo/client';

const App = () => {
  const allTasks = useTasksQuery();

  const [tasks, setTasks] = useState<Task[] | undefined>();
  const [checkedTasks, setCheckedTasks] = useState<CheckedTask[]>([]);
  const [sortStatus, setSortStatus] = useState<StatusOptions>(StatusOptions.ALL_STATUSES);
  const [searchValue, setSearchValue] = useState<string>('');
  const [updateTask] = useMutation(UPDATE_TASK, {
    onCompleted: () => {
      allTasks.tasksRefetch(); // Fetch the updated tasks after mutation completes
    },
  });

  const displayTasks = useMemo((): Task[] | undefined => {
    if (sortStatus === StatusOptions.ALL_STATUSES && searchValue === '') return allTasks.data;

    const updatedTasks = allTasks.data?.map((task) => {
      return {
        ...task,
        subTasks: task.subTasks.filter(
          (subTask) =>
            (subTask.statusId === sortStatus || sortStatus === StatusOptions.ALL_STATUSES) &&
            subTask.title.includes(searchValue)
        ),
      };
    });

    return updatedTasks?.filter((task) => {
      return (
        (task && task.subTasks && task.subTasks.length > 0) ||
        ((task.statusId === sortStatus || sortStatus === StatusOptions.ALL_STATUSES) &&
          task.title.includes(searchValue))
      );
    });
  }, [sortStatus, searchValue, allTasks.data, allTasks.tasksLoading]);

  const updateTaskData = async (
    { dueDate, madeBy, owner, statusId, title }: Task,
    updatedTaskId: number
  ) => {
    await updateTask({
      variables: {
        taskId: updatedTaskId,
        dueDate,
        madeBy,
        owner,
        statusId,
        title,
      },
    });
  };

  const handleSortStatusChange = (status: StatusOptions) => () => {
    if (status !== sortStatus) setSortStatus(status);
  };

  const handleSearchValueChange = (value: string) => {
    setSearchValue(value);
  };

  const handleCheckedTask = (
    taskId: number,
    checkedStatus: boolean,
    type: TasksTypes,
    parentId: number
  ) => {
    let updatedCheckedTasks = [...checkedTasks];
    if (checkedStatus) {
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
            tasks={displayTasks}
            searchValue={searchValue}
            sortStatus={sortStatus}
            checkedTasks={checkedTasks}
            refetchTasks={allTasks.tasksRefetch}
            updateCheckedTasksData={setCheckedTasks}
            handleSearchValueChange={handleSearchValueChange}
            handleSortStatusChange={handleSortStatusChange}
          />
          <TasksContainer
            displayTasks={displayTasks}
            sortStatus={sortStatus}
            updateTaskData={updateTaskData}
            checkedTasks={checkedTasks}
            handleCheckedTask={handleCheckedTask}
            refetchTasks={allTasks.tasksRefetch}
          />
        </div>
      </statusesContext.Provider>
    </>
  );
};

export default App;
