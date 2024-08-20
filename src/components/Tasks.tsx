import TaskRow from "./TaskRow"
import {tasks} from '../tasksData'

export default function Tasks(){
  return(
    <div id='tasks'>
      <div id='lables'>
        <label id="endDateLable">תאריך לביצוע</label>
        <label id="madeByLable">יוצר</label>
        <label id="OwnerLable">בעלים</label>
      </div>
      <div id="tasksRows">
      
      </div>
    </div>

  )
}