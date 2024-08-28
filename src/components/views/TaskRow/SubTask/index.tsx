import './SubTask.css'
import {CheckBox} from "../../../elements/CheckBox/CheckBox";
import {TaskStatusChanger} from "../../TaskStatusChanger";
import {statusOptions} from '../../../types/tasksData';

type SubTaskProps = {
  title:string, 
  status: statusOptions,
}

export const SubTask = ({title, status}:SubTaskProps) => {  
  return(
    <div className="subTask">
      <CheckBox/>
      <input className='inputTask subTaskLabel' value={title} onChange={()=>{}} />
      <TaskStatusChanger status={status}/>
    </div>
  )
}