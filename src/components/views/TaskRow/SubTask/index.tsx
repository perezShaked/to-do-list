import './SubTask.css'
import {CheckBox} from "../../../elements/CheckBox/CheckBox";
import {TaskStatusChanger} from "../../TaskStatusChanger";
import {statusOptions, SubTaskType, Task} from '../../../types/tasksData';
import { useState } from 'react';

type SubTaskProps = {
  subTask: SubTaskType,
  handleCheckedTask: (taskId: number, checkedStatus: boolean, type: 'task'|'subTask', parentId: number) => void,
  parentId: number,
  isSTChecked: boolean,
  updateSubTaskData: (updateSubTask: SubTaskType, subTaskId: number) => void
}

export const SubTaskRow = ({subTask, handleCheckedTask, parentId, isSTChecked, updateSubTaskData }:SubTaskProps) => {
  const [isChecked, setIsChecked] = useState(isSTChecked);

  const handleSubTaskStatusChange = (status: statusOptions) => () => {
    const updateSubTask = {...subTask, status: status}
    updateSubTaskData(updateSubTask, subTask.id);
    }

  const handleSubTaskTitleChange = (element: React.ChangeEvent<HTMLInputElement>) => {
      const updateSubTask = {...subTask, title: element.target.value}
      updateSubTaskData(updateSubTask, subTask.id);
      }

  const handleCheckedStatus = ( element: React.ChangeEvent<HTMLInputElement>) => {
    const updatedChecked = element.target.checked;
    setIsChecked(updatedChecked);
    handleCheckedTask(subTask.id, updatedChecked, 'subTask', parentId);
  }
  
  return(
    <div className="subTask">
      <CheckBox checked={isChecked} onChange={handleCheckedStatus}/>
      <input className='inputTask subTaskLabel' value={subTask.title} onChange={handleSubTaskTitleChange} />
      <TaskStatusChanger onClick={handleSubTaskStatusChange} status={subTask.status}/>
    </div>
  )
}