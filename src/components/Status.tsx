import './components_style/Status.css'
import {ArrowIcon} from './ArrowIcon'

const statuses = new Map<string, string>([
  ['wait', 'מחכה'],
  ['pendingUpdate', 'ממתין לעדכון'],
  ['completed', 'בוצע'],
  ['canceled', 'בוטל'],
  ['inProgress', 'בעבודה']
]);

export default function Status({status, includeArrow}:{status: string, includeArrow: boolean}){
  return(
    <div id="statusContainer">
      <button className="status" id={status}>{statuses.get(status)}</button>
      {includeArrow ? <ArrowIcon usedBy="statusDownArrow" direction='down' /> : null}
    </div>
  )
}