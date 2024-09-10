import "./ManageContainer.css";
import { SearchBar } from "./SearchBar";
import { SortButton } from "./SortButton";
import { DeleteTaskButton } from "./DeleteTaskButton";
import { NewTaskButton } from "./NewTaskButton";
import { Task, CheckedTask, StatusOptions } from "../../types/types";
import { useState, useMemo } from "react";

type ManagementContainerProps = {
  tasks: Task[];
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
  const [nextId, setNextId] = useState(tasks.length);

  const addNewSubTask = ({ subTasks }: Task) => {
    let nextSubTaskId = 0;
    if (subTasks.length > 0) {
      nextSubTaskId = subTasks[subTasks.length - 1].id + 1;
    }
    subTasks.push({
      id: nextSubTaskId,
      title: "",
      status: StatusOptions.PENDING_UPDATE,
    });
  };

  const newTask = (): Task => {
    return {
      id: nextId,
      title: "",
      dueDate: new Date(),
      madeBy: "",
      owner: "",
      status: StatusOptions.PENDING_UPDATE,
      subTasks: [],
    };
  };

  const handleAddNewTaskClick = () => {
    const updatedTasks = [...tasks];
    if (checkedTasks.length > 0) {
      checkedTasks.forEach((checkedTask) => {
        updatedTasks.forEach((task) => {
          if (checkedTask.id == task.id) {
            addNewSubTask(task);
          }
        });
      });
    } else {
      updatedTasks.push(newTask());
      setNextId(nextId + 1);
    }
    updateTasksData(updatedTasks);
  };

  const handleDeleteTask = () => {
    let updatedTasks = [...tasks];
    checkedTasks.forEach(({ parentId, id, type }) => {
      if (type == "subTask") {
        updatedTasks = updatedTasks.map((task) => {
          if (task.id == parentId) {
            return {
              ...task,
              subTasks: task.subTasks.filter((task) => task.id != id),
            };
          }
          return task;
        });
      } else {
        updatedTasks = updatedTasks.filter((task) => task.id != id);
      }
    });
    updateTasksData(updatedTasks);
    updateCheckedTasksData([]);
  };

  const updatedIsSubTaskChecked = useMemo(() => {
    let updatedIsSubTaskChecked = false;
    checkedTasks.forEach(({ type }) => {
      if (type == "subTask") {
        updatedIsSubTaskChecked = true;
      }
    });
    return updatedIsSubTaskChecked;
  }, [checkedTasks]);

  return (
    <div className="manageContainer">
      <div className="searchAndSort">
        <SearchBar value={searchValue} onChange={handleSearchValueChange} />
        <SortButton onClick={handleSortStatusChange} sortStatus={sortStatus} />
      </div>
      <div className="addAndDelete">
        <DeleteTaskButton onClick={handleDeleteTask} />
        <NewTaskButton onClick={handleAddNewTaskClick} disabled={updatedIsSubTaskChecked} />
      </div>
    </div>
  );
};
