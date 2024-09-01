import './SubTask.css'
import {CheckBox} from "../../../elements/CheckBox/CheckBox";
import {TaskStatusChanger} from "../../TaskStatusChanger";
import {statusOptions, SubTaskType} from '../../../types/tasksData';
import { useState } from 'react';

type SubTaskProps = {
  receivedSubTask: SubTaskType,
  handleCheckedTask: (taskId: number, checkedStatus: boolean) => void,
}

export const SubTaskRow = ({receivedSubTask, handleCheckedTask }:SubTaskProps) => {
  const [subTask, setSubTask] = useState(receivedSubTask); 
  const [isChecked, setIsChecked] = useState(false);


  const handleSubTaskStatusChange = (status: statusOptions) => () => {
    setSubTask({...subTask, status: status});
  }

  const handleCheckedStatus = ( element: React.ChangeEvent<HTMLInputElement>) => {
    const updatedChecked = element.target.checked;
    setIsChecked(updatedChecked);
    handleCheckedTask(subTask.id, updatedChecked);
  }

  return(
    <div className="subTask">
      <CheckBox checked={isChecked} onChange={handleCheckedStatus}/>
      <input className='inputTask subTaskLabel' value={subTask.title} onChange={()=>{}} />
      <TaskStatusChanger onClick={handleSubTaskStatusChange} status={subTask.status}/>
    </div>
  )
}