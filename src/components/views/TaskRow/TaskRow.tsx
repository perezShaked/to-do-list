import './components_style/TaskRow.css'
import {CheckBox} from "../../elements/CheckBox/CheckBox";
import {ArrowIcon} from '../../elements/ArrowIcon/ArrowIcon'
import {TaskStatusBadge} from "../../TaskStatusBadge";
import {Task} from '../../types/tasksData';
import {useState} from "react";
import {SubTask} from "./SubTask";

type TaskRowProps = {task: Task}

export const TaskRow = ({task}:TaskRowProps) => {
  const haveSubtasks = task.subTasks.length > 0 
  const [showSubTasks, setShowSubTask] = useState(haveSubtasks);
  
  const openSubTasks = () => {
    setShowSubTask(!showSubTasks);
  }

  const convertDateToString = (date:Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }

  return(
    <div className="taskRow">
      <div className={`task ${showSubTasks}ShowSubTasks`}>
        <div className="taskInfo">
          <CheckBox/>
          {
            (task.subTasks.length > 0) &&
              <ArrowIcon className="taskRowArrowButton" direction={showSubTasks ? "down" : "left"} onClick={openSubTasks}/>       
          }
          <input className='inputTask taskLabel' value={task.title} onChange={()=>{}} />
          {(task.subTasks.length > 0) && <div className="numOfSubTasks">{`${task.subTasks.length}+`}</div>}
        </div>
        <input className='inputTask dueDate' type="date" value={convertDateToString(task.dueDate)} onChange={()=>{}} />
        <input className='inputTask' value={task.madeBy} onChange={()=>{}}/>
        <input className='inputTask' value={task.owner} onChange={()=>{}}/>
        <TaskStatusBadge includeArrow={true} status={task.status}/>
      </div>
      {(task.subTasks.length > 0) && showSubTasks && 
        <div>
          {task.subTasks.map((subTask) => <SubTask key={subTask.id} status={subTask.status} title={subTask.title}/>)}  
        </div>
      }
    </div>
    )
}
