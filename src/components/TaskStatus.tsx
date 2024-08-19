import ArrowButton from "./ArrowButton";

const statuses = new Map<string, string>([
  ['wait', 'מחכה'],
  ['pendingUpdate', 'ממתין לעדכון'],
  ['completed', 'בוצע'],
  ['canceled', 'בוטל'],
  ['inProgress', 'בעבודה']
]);

export default function TaskStatus({status, includeArrow}:{status: string, includeArrow: boolean}){
  return(
    <div id="statusContainer">
      <button className="taskStatus" id={status}>{statuses.get(status)}</button>
      {includeArrow && <ArrowButton usedBy="statusDownArrow" />}
    </div>
  )
}