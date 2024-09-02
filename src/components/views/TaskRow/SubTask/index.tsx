import './SubTask.css'
import {CheckBox} from "../../../elements/CheckBox/CheckBox";
import {TaskStatusChanger} from "../../TaskStatusChanger";
import {statusOptions, SubTaskType} from '../../../types/tasksData';
import { useState } from 'react';

type SubTaskProps = {
  receivedSubTask: SubTaskType,
  handleCheckedTask: (taskId: number, checkedStatus: boolean, type: 'task'|'subTask', parentId: number) => void,
  parentId: number,
  isSTChecked: boolean
}

export const SubTaskRow = ({receivedSubTask, handleCheckedTask, parentId, isSTChecked}:SubTaskProps) => {
  const [subTask, setSubTask] = useState(receivedSubTask); 
  const [isChecked, setIsChecked] = useState(isSTChecked);

  const handleSubTaskStatusChange = (status: statusOptions) => () => {
    setSubTask({...subTask, status: status});
  }

  const handleCheckedStatus = ( element: React.ChangeEvent<HTMLInputElement>) => {
    const updatedChecked = element.target.checked;
    setIsChecked(updatedChecked);
    handleCheckedTask(subTask.id, updatedChecked, 'subTask', parentId);
  }

  return(
    <div className="subTask">
      <CheckBox checked={isChecked} onChange={handleCheckedStatus}/>
      <input className='inputTask subTaskLabel' value={subTask.title} onChange={()=>{}} />
      <TaskStatusChanger onClick={handleSubTaskStatusChange} status={subTask.status}/>
    </div>
  )
}