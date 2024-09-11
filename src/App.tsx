import "./App.css";
import { useState, useMemo } from "react";
import { TimeStamp } from "./components/views/TimeStamp";
import { CheckedTask, Task, StatusOptions, TasksTypes } from "./types";
import { TasksContainer } from "./components/views/TasksContainer";
import { ManagementContainer } from "./components/views/ManagementContainer";
import { tasksData } from "./data";

const App = () => {
  const [tasks, setTasks] = useState<Task[]>(tasksData);
  const [checkedTasks, setCheckedTasks] = useState<CheckedTask[]>([]);
  const [sortStatus, setSortStatus] = useState<StatusOptions>(StatusOptions.ALL_STATUSES);
  const [searchValue, setSearchValue] = useState<string>("");

  const displayTasks = useMemo((): Task[] => {
    if (sortStatus === StatusOptions.ALL_STATUSES && searchValue === "") return tasks;

    const updatedTasks = tasks.map((task) => {
      return {
        ...task,
        subTasks: task.subTasks.filter(
          (subTask) =>
            (subTask.status === sortStatus || sortStatus === StatusOptions.ALL_STATUSES) &&
            subTask.title.includes(searchValue)
        ),
      };
    });

    return updatedTasks.filter(({ status, subTasks, title }) => {
      return (
        subTasks.length > 0 ||
        ((status === sortStatus || sortStatus === StatusOptions.ALL_STATUSES) &&
          title.includes(searchValue))
      );
    });
  }, [sortStatus, searchValue, tasks]);

  const updateTaskData = (updatedTask: Task, taskId: number) => {
    const updatedTasks = tasks.map((task) => (task.id === taskId ? updatedTask : task));
    setTasks(updatedTasks);
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
      <TimeStamp />
      <div className="appContainer">
        <div className="header">משימות</div>
        <ManagementContainer
          tasks={tasks}
          searchValue={searchValue}
          sortStatus={sortStatus}
          checkedTasks={checkedTasks}
          updateTasksData={setTasks}
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
        />
      </div>
    </>
  );
};

export default App;
