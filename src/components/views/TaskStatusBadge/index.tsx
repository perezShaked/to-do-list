import './TaskStatusBadge.css'
import { statusOptions } from '../../types/tasksData';


const statuses = new Map<string, {hebrewName:string, color: string}>([
  ['wait',
     {hebrewName:'מחכה', color: '#2999ED'}],
  ['pendingUpdate',
     {hebrewName:'ממתין לעדכון', color: '#929292'}],
  ['completed',
     {hebrewName:'בוצע', color: '#2D8B00'}],
  ['canceled',
     {hebrewName:'בוטל', color: '#F85359'}],
  ['inProgress',
     {hebrewName:'בעבודה', color: '#F0AD00'}],
]);

type StatusProps = {
  status: statusOptions
}

export const TaskStatusBadge = ({status}:StatusProps) => {
  return(
    <div>
      <button className={`status`} style={{backgroundColor: (statuses.get(status)?.color)}} >
        {statuses.get(status)?.hebrewName}
      </button>
    </div>
  )
}