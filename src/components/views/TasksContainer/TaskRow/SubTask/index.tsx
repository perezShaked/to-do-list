import "./SubTask.css";
import { CheckBox } from "../../../../elements/CheckBox";
import { TaskStatusChanger } from "../TaskStatusChanger";
import { StatusOptions, SubTask, TasksTypes } from "../../../../types/types";
import { useState } from "react";
import clsx from "clsx";

type SubTaskProps = {
  subTask: SubTask;
  handleCheckedTask: (
    taskId: number,
    checkedStatus: boolean,
    type: TasksTypes,
    parentId: number
  ) => void;
  parentId: number;
  isSubTaskChecked: boolean;
  updateSubTaskData: (updatedSubTask: SubTask, subTaskId: number) => void;
};

export const SubTaskRow = ({
  subTask,
  handleCheckedTask,
  parentId,
  isSubTaskChecked,
  updateSubTaskData,
}: SubTaskProps) => {
  const [isChecked, setIsChecked] = useState(isSubTaskChecked);
  const [subTaskTitle, setSubTaskTitle] = useState(subTask.title);

  const handleSubTaskStatusChange = (status: StatusOptions) => () => {
    updateSubTaskData({ ...subTask, status }, subTask.id);
  };

  const handleSubTaskTitleChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    updateSubTaskData({ ...subTask, title: value }, subTask.id);
  };

  const handleCheckedStatus = ({ target: { checked } }: React.ChangeEvent<HTMLInputElement>) => {
    const updatedChecked = checked;
    setIsChecked(updatedChecked);
    handleCheckedTask(subTask.id, updatedChecked, "subTask", parentId);
  };

  return (
    <div className="subTask">
      <CheckBox checked={isChecked} onChange={handleCheckedStatus} />
      <input
        className={clsx("inputTask", "subTaskTitle")}
        value={subTaskTitle}
        onChange={(e) => setSubTaskTitle(e.target.value)}
        onBlur={handleSubTaskTitleChange}
      />
      <TaskStatusChanger onClick={handleSubTaskStatusChange} status={subTask.status} />
    </div>
  );
};
