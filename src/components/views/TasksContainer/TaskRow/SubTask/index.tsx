import './SubTask.css'
import { CheckBox } from '../../../../elements/CheckBox';
import { TaskStatusChanger } from "../TaskStatusChanger";
import { statusOptions, SubTaskType} from '../../../../types/tasksData';
import { useState } from 'react';

type SubTaskProps = {
  subTask: SubTaskType,
  handleCheckedTask: (taskId: number, checkedStatus: boolean, type: 'task'|'subTask', parentId: number) => void,
  parentId: number,
  isSubTaskChecked: boolean,
  updateSubTaskData: (updateSubTask: SubTaskType, subTaskId: number) => void
}

export const SubTaskRow = ({subTask, handleCheckedTask, parentId, isSubTaskChecked, updateSubTaskData }:SubTaskProps) => {
  const [isChecked, setIsChecked] = useState(isSubTaskChecked);
  const [subTaskTitle, setSubTaskTitle] = useState(subTask.title);

  const handleSubTaskStatusChange = (status: statusOptions) => () => {
    updateSubTaskData({...subTask, status: status} , subTask.id);
    }

  const handleSubTaskTitleChange = (element: React.ChangeEvent<HTMLInputElement>) => {
    updateSubTaskData({...subTask, title: element.target.value} , subTask.id);
    }

  const handleCheckedStatus = ( element: React.ChangeEvent<HTMLInputElement>) => {
    const updatedChecked = element.target.checked;
    setIsChecked(updatedChecked);
    handleCheckedTask(subTask.id, updatedChecked, 'subTask', parentId);
  }
  
  return(
    <div className="subTask">
      <CheckBox checked={isChecked} onChange={handleCheckedStatus}/>
      <input className='inputTask subTaskTitle' value={subTaskTitle} onChange={(e) => setSubTaskTitle(e.target.value)} onBlur={handleSubTaskTitleChange} />
      <TaskStatusChanger onClick={handleSubTaskStatusChange} status={subTask.status}/>
    </div>
  )
}