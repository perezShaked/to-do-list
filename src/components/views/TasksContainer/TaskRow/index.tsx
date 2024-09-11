import "./TaskRow.css";
import { CheckBox } from "../../../elements/CheckBox";
import { ArrowIcon } from "../../../elements/ArrowIcon";
import { TaskStatusChanger } from "./TaskStatusChanger";
import { CheckedTask, StatusOptions, Task, SubTask, TasksTypes } from "../../../../types";
import { useEffect, useState, useRef } from "react";
import { SubTaskRow } from "./SubTask";
import { convertDateToString } from "../../../../utils";
import clsx from "clsx";

type TaskRowProps = {
  task: Task;
  handleCheckedTask: (
    taskId: number,
    checkedStatus: boolean,
    type: TasksTypes,
    parentId: number
  ) => void;
  isTaskChecked: boolean;
  updateTaskData: (updatedTask: Task, taskId: number) => void;
  sortStatus: StatusOptions;
  checkedSubTasks: CheckedTask[];
};

export const TaskRow = ({
  task,
  handleCheckedTask,
  isTaskChecked,
  updateTaskData,
  sortStatus,
  checkedSubTasks,
}: TaskRowProps) => {
  const [showSubTasks, setShowSubTask] = useState(false);
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [taskDueDate, setTaskDueDate] = useState(convertDateToString(task.dueDate));
  const [taskMadeBy, setTaskMadeBy] = useState(task.madeBy);
  const [taskOwner, setTaskOwner] = useState(task.owner);
  const [isChecked, setIsChecked] = useState(isTaskChecked);
  const haveSubTasks = task.subTasks.length > 0;

  const isSubTaskChecked = (subTaskId: number): boolean =>
    checkedSubTasks.some((subTask) => subTaskId === subTask.id);

  const handleInputChange = (field: keyof Task) => (event: React.ChangeEvent<HTMLInputElement>) => {
    let value: string | Date = event.currentTarget.value;
    if (field === "dueDate") {
      value = new Date(event.target.value);
      if (isNaN(value.getTime())) {
        event.preventDefault();
        event.target.focus();
      }
    }
    const updatedTask: Task = { ...task, [field]: value };
    updateTaskData(updatedTask, task.id);
  };

  const handleStatusChange = (status: StatusOptions) => () => {
    const updatedTask = { ...task, status };
    updateTaskData(updatedTask, task.id);
  };

  const handleChecked = ({ target: { checked } }: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(checked);
    if (checked) {
      setShowSubTask(true);
    }
    handleCheckedTask(task.id, checked, TasksTypes.TASK, -1);
  };

  const updateSubTaskData = (updatedSubTask: SubTask, subTaskId: number) => {
    updateTaskData(
      {
        ...task,
        subTasks: task.subTasks.map((subTask) =>
          subTask.id === subTaskId ? updatedSubTask : subTask
        ),
      },
      task.id
    );
  };

  const prevSortStatus = useRef(sortStatus);
  const subTasksExpanded =
    (prevSortStatus.current !== sortStatus && sortStatus !== StatusOptions.ALL_STATUSES) ||
    showSubTasks;

  useEffect(() => {
    prevSortStatus.current = sortStatus;
  }, [sortStatus]);

  return (
    <div className="taskRow">
      <div className={clsx("task", { ShowSubTasks: subTasksExpanded && haveSubTasks })}>
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
          {haveSubTasks && <div className="numOfSubTasks">{`${task.subTasks.length}+`}</div>}
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
              isSubTaskChecked={isSubTaskChecked(subTask.id)}
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
