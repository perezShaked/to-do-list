import CheckBox from "./CheckBox";
import ArrowButton from "./ArrowButton";
import TaskStatus from "./TaskStatus";
import NumOfSubTasks from "./NumOfSubTasks";

type taskOptions = 'wait' | 'pendingUpdate' | 'completed' | 'canceled' | 'inProgress'


export default function TaskRow({taskStatus}:{taskStatus: taskOptions }){
  return(
    <div className="taskRow">
      <div className="taskInfo">
        <CheckBox/>
        <ArrowButton usedBy="taskRowArrowButton" />
        <input className='inputTask' id="taskLable"></input>
        <NumOfSubTasks numOfSubTasks={4}/>
      </div>
      <input className='inputTask' id="taskEndDate"></input>
      <input className='inputTask' id="TaskMadeBy"></input>
      <input className='inputTask' id="TaskOwner"></input>
      <TaskStatus includeArrow={true} status={taskStatus}/>
    </div>)
}
