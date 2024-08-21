import './components_style/TaskStatusBadge.css'
import {ArrowIcon} from './elements/ArrowIcon/ArrowIcon'
import { statusOptions } from './types/tasksData';

type StatusProps = {
  status: statusOptions, 
  includeArrow: boolean,
}

export const TaskStatusBadge = ({status, includeArrow}:StatusProps) => {
  const statuses = new Map<string, {hebrewName:string, color: string}>([
    ['wait', {hebrewName:'מחכה', color: '#2999ED'}],
    ['pendingUpdate', {hebrewName:'ממתין לעדכון', color: '#929292'}],
    ['completed', {hebrewName:'בוצע', color: '#2D8B00'}],
    ['canceled', {hebrewName:'בוטל', color: '#F85359'}],
    ['inProgress', {hebrewName:'בעבודה', color: '#F0AD00'}],
  ]);  

  return(
    <button className={`status ${status}`} style={{backgroundColor: (statuses.get(status)?.color)}} >
      {statuses.get(status)?.hebrewName}
      {includeArrow && <ArrowIcon className="statusDownArrow" direction='down' />}
    </button>
  )
}