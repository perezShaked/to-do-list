import './SubTask.css'
import {CheckBox} from "../../elements/CheckBox/CheckBox";
import {TaskStatusBadge} from "../../../components/TaskStatusBadge";
import {statusOptions} from '../../types/tasksData';

type SubTaskProps = {
  title:string, 
  status: statusOptions
}

export const SubTask = ({title, status}:SubTaskProps) => {
  return(
    <div className="subTask">
      <CheckBox/>
      <input className='inputTask subTaskLabel' value={title} onChange={()=>{}} />
      <TaskStatusBadge includeArrow={true} status={status}/>
    </div>
  )
}