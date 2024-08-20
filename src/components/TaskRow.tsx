import CheckBox from "./CheckBox";
import ArrowButton from "./ArrowButton";
import Status from "./Status";
import NumOfSubTasks from "./NumOfSubTasks";
import {Task} from '../tasksData';


export default function TaskRow({task, subTasksOpen}:{task: Task, subTasksOpen: boolean}){
  return(
    <div className="taskRow" about={`${subTasksOpen}`}>
      <div className="taskInfo">
        <CheckBox/>
        {subTasksOpen ? <ArrowButton usedBy="taskRowArrowButton" direction="down"/> : <ArrowButton usedBy="taskRowArrowButton" direction="left"/>}
        <input className='inputTask' id="taskLable" value={task.title} onChange={()=>{}} />
        <NumOfSubTasks numOfSubTasks={4}/>
      </div>
      <input className='inputTask' id='dueDate' type="date" value={task.dueDate} onChange={()=>{}} />
      <input className='inputTask' id="TaskMadeBy" value={task.madeBy} onChange={()=>{}}/>
      <input className='inputTask' id="TaskOwner" value={task.owner} onChange={()=>{}}/>
      {subTasksOpen ? null : <Status includeArrow={true} status={task.status}/>}
    </div>)
}
