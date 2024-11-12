import './SubTask.css';
import { CheckBox } from '../../../../elements/CheckBox';
import { TaskStatusChanger } from '../TaskStatusChanger';
import { StatusOptions, SubTask, TasksTypes } from '../../../../../types';
import { useState } from 'react';

type SubTaskRowProps = {
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
}: SubTaskRowProps) => {
  const [isChecked, setIsChecked] = useState(isSubTaskChecked);
  const [subTaskTitle, setSubTaskTitle] = useState(subTask.title);

  const handleSubTaskStatusChange = (statusId: number) => () => {
    updateSubTaskData({ ...subTask, statusId }, subTask.subTaskId);
  };

  const handleSubTaskTitleChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    updateSubTaskData({ ...subTask, title: value }, subTask.subTaskId);
  };

  const handleCheckedStatus = ({ target: { checked } }: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(checked);
    handleCheckedTask(subTask.subTaskId, checked, TasksTypes.SUB_TASK, parentId);
  };

  return (
    <div className="subTask">
      <CheckBox checked={isChecked} onChange={handleCheckedStatus} />
      <input
        className="inputTask subTaskTitle"
        value={subTaskTitle}
        onChange={(e) => setSubTaskTitle(e.target.value)}
        onBlur={handleSubTaskTitleChange}
      />
      <TaskStatusChanger onClick={handleSubTaskStatusChange} statusId={subTask.statusId} />
    </div>
  );
};
