import "./TaskRow.css";
import { CheckBox } from "../../../elements/CheckBox";
import { ArrowIcon } from "../../../elements/ArrowIcon";
import { TaskStatusChanger } from "./TaskStatusChanger";
import {
  checkedTasks,
  statusOptions,
  Task,
  SubTaskType,
} from "../../../types/tasksData";
import { useEffect, useState, useRef } from "react";
import { SubTaskRow } from "./SubTask";

type TaskRowProps = {
  task: Task;
  handleCheckedTask: (
    taskId: number,
    checkedStatus: boolean,
    type: "task" | "subTask",
    parentId: number
  ) => void;
  checkedTasks: checkedTasks[];
  updateTaskData: (updateTask: Task, taskId: number) => void;
  sortStatus: statusOptions;
};

export const TaskRow = ({
  task,
  handleCheckedTask,
  checkedTasks,
  updateTaskData,
  sortStatus,
}: TaskRowProps) => {
  const [showSubTasks, setShowSubTask] = useState(false);
  const [taskTitle, setTaskTitle] = useState(task.title);

  const convertDateToString = (date: Date) => {
    if (!isNaN(date.getTime())) return date.toISOString().split("T")[0];
  };

  const [taskDueDate, setTaskDueDate] = useState(
    convertDateToString(task.dueDate)
  );
  const [taskMadeBy, setTaskMadeBy] = useState(task.madeBy);
  const [taskOwner, setTaskOwner] = useState(task.owner);
  const haveSubTasks = task.subTasks.length > 0;

  const isTaskChecked = (taskId: number, parentId: number) => {
    const result = checkedTasks.some(
      (task) => task.id == taskId && task.parentId == parentId
    );
    return result;
  };

  const [isChecked, setIsChecked] = useState(isTaskChecked(task.id, -1));

  const handleInputChange =
    (field: keyof Task) => (element: React.ChangeEvent<HTMLInputElement>) => {
      let value: string | Date = element.currentTarget.value;
      if (field === "dueDate") {
        value = new Date(element.currentTarget.value);
      }
      const updateTask: Task = { ...task, [field]: value };
      updateTaskData(updateTask, task.id);
    };

  const handleStatusChange = (status: statusOptions) => () => {
    const updateTask = { ...task, status };
    updateTaskData(updateTask, task.id);
  };

  const handleChecked = (element: React.ChangeEvent<HTMLInputElement>) => {
    const updatedChecked = element.target.checked;
    setIsChecked(updatedChecked);
    if (updatedChecked) {
      setShowSubTask(true);
    }
    handleCheckedTask(task.id, updatedChecked, "task", -1);
  };

  const updateSubTaskData = (updateSubTask: SubTaskType, subTaskId: number) => {
    updateTaskData(
      {
        ...task,
        subTasks: task.subTasks.map((subTask) =>
          subTask.id === subTaskId ? updateSubTask : subTask
        ),
      },
      task.id
    );
  };

  const prevSortStatus = useRef(sortStatus);
  const subTasksExpanded =
    (prevSortStatus.current !== sortStatus && sortStatus !== "allStatuses") ||
    showSubTasks;

  useEffect(() => {
    prevSortStatus.current = sortStatus;
  }, [sortStatus]);

  return (
    <div className="taskRow">
      <div className={`task ${subTasksExpanded && haveSubTasks}ShowSubTasks`}>
        <div className="taskInfo">
          <CheckBox checked={isChecked} onChange={handleChecked} />
          {haveSubTasks && (
            <ArrowIcon
              className="taskRowArrowButton"
              direction={subTasksExpanded ? "down" : "left"}
              onClick={() => {
                setShowSubTask(!showSubTasks);
              }}
            />
          )}
          <input
            className="inputTask"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            onBlur={handleInputChange("title")}
          />
          {haveSubTasks && (
            <div className="numOfSubTasks">{`${task.subTasks.length}+`}</div>
          )}
        </div>
        <input
          className="inputTask dueDate"
          type="date"
          value={taskDueDate}
          onChange={(e) => setTaskDueDate(e.target.value)}
          onBlur={handleInputChange("dueDate")}
        />
        <input
          className="inputTask"
          value={taskMadeBy}
          onChange={(e) => setTaskMadeBy(e.target.value)}
          onBlur={handleInputChange("madeBy")}
        />
        <input
          className="inputTask"
          value={taskOwner}
          onChange={(e) => setTaskOwner(e.target.value)}
          onBlur={handleInputChange("owner")}
        />
        <TaskStatusChanger onClick={handleStatusChange} status={task.status} />
      </div>
      {task.subTasks.length > 0 && subTasksExpanded && (
        <div>
          {task.subTasks.map((subTask) => (
            <SubTaskRow
              key={subTask.id}
              updateSubTaskData={updateSubTaskData}
              isSubTaskChecked={isTaskChecked(subTask.id, task.id)}
              subTask={subTask}
              parentId={task.id}
              handleCheckedTask={handleCheckedTask}
            />
          ))}
        </div>
      )}
    </div>
  );
};
