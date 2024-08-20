import './components_style/SubTask.css'
import CheckBox from "./CheckBox";
import Status from "./Status";
import {statusOptions} from '../tasksData';



export default function SubTask({title, status}:{title:string, status: statusOptions}){
  return(
    <div className="subTask">
      <CheckBox/>
      <input className='inputTask' id="subTaskLable" value={title} onChange={()=>{}} />
      <Status includeArrow={true} status={status}/>
    </div>
  )
}