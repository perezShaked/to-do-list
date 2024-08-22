import { useState } from 'react';
import './components_style/TaskStatusBadge.css'
import {ArrowIcon} from './elements/ArrowIcon/ArrowIcon'
import { statusOptions } from './types/tasksData';
import { TaskStatusBadgeSelector } from './TaskStatusBadgeSelector'

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
  status: statusOptions, 
  includeArrow: boolean,
}

export const TaskStatusBadge = ({status, includeArrow}:StatusProps) => {
  const [statusSelectorOpen, setStatusSelectorOpen] = useState(false);
  
  const openStatusSelector = () => {
    if(includeArrow){
      setStatusSelectorOpen(!statusSelectorOpen);
    } 
    else{
      /* להעביר לקומפוננטה את האיידי של המשימה שהוא עלייה ואז לשנות את הסטטוס שלה במאגר מידע */

    }
  }

  return(
    <div className="statusContainer">
      <button className={`status ${status}`} onClick={openStatusSelector} style={{backgroundColor: (statuses.get(status)?.color)}} >
        {statuses.get(status)?.hebrewName}
        {includeArrow && <ArrowIcon className="statusDownArrow" direction='down' />}
      </button>
      {statusSelectorOpen && <TaskStatusBadgeSelector/>}
    </div>
  )
}