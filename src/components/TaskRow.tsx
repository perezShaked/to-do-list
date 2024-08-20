import './components_style/TaskRow.css'
import CheckBox from "./CheckBox";
import {ArrowIcon} from './ArrowIcon'
import Status from "./Status";
import NumOfSubTasks from "./NumOfSubTasks";
import {Task, tasks} from '../tasksData';
import { useState } from "react";
import SubTask from "./SubTask";


export default function TaskRow({task}:{task: Task}){

  const [t, setT] = useState(tasks);
  
  const openSubTasks = () => {
    const updateTasks = [...tasks];
    updateTasks[task.id].showSubTasks = !updateTasks[task.id].showSubTasks;
    setT(updateTasks);
  }

  return(
    <div className="taskRow">
      <div className="task" about={`${task.showSubTasks}`}>
        <div className="taskInfo">
          <CheckBox/>
          {
            (task.subTasks.length > 0) ? 
              <ArrowIcon usedBy="taskRowArrowButton" direction={task.showSubTasks? "down" : "left"} onClick={openSubTasks}/>
            : null       
          }
          <input className='inputTask' id="taskLable" value={task.title} onChange={()=>{}} />
          <NumOfSubTasks numOfSubTasks={task.subTasks.length}/>
        </div>
        <input className='inputTask' id='dueDate' type="date" value={task.dueDate} onChange={()=>{}} />
        <input className='inputTask' id="TaskMadeBy" value={task.madeBy} onChange={()=>{}}/>
        <input className='inputTask' id="TaskOwner" value={task.owner} onChange={()=>{}}/>
        {task.showSubTasks ? null : <Status includeArrow={true} status={task.status}/>}
      </div>
      <div className="subTasks">
        {
          (task.subTasks.length > 0) && task.showSubTasks ? task.subTasks.map((t) => <SubTask key={t.id} status={t.status} title={t.title}/>) : null
        }
      </div>
    </div>
    )
}
