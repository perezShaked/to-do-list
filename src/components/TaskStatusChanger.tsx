import { useEffect, useRef, useState } from 'react';
import './components_style/TaskStatusBadge.css'
import {ArrowIcon} from './elements/ArrowIcon'
import { statusOptions } from './types/tasksData';
import { TaskStatusBadgeSelector } from './TaskStatusBadgeSelector'
import { TaskStatusBadge } from './TaskStatusBadge';


type StatusProps = {
  status: statusOptions, 
}

export const TaskStatusChanger = ({status}:StatusProps) => {
  const [isStatusSelectorOpen, setIsStatusSelectorOpen] = useState(false);
  const statusSelectorRef = useRef<HTMLInputElement>(null)

  const handleStatusSelectorShowState = (e: MouseEvent) => {
    if(statusSelectorRef.current && !statusSelectorRef.current.contains(e.target as Node)){
      setIsStatusSelectorOpen(false);
    }
  }

  const openStatusSelector = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsStatusSelectorOpen(!isStatusSelectorOpen);
  }

  useEffect(() => {
    if(isStatusSelectorOpen){
      document.addEventListener('mousedown',handleStatusSelectorShowState);
    }else{
      document.removeEventListener('mousedown',handleStatusSelectorShowState);
    }
    
  },[isStatusSelectorOpen])

  return(
    <div ref={statusSelectorRef} className='statusChanger'>
      <div className='statusContainer' onClick={openStatusSelector}>
        <TaskStatusBadge  status={status}/>
        <ArrowIcon className="statusArrow" direction={isStatusSelectorOpen ? 'up' :'down'} />
      </div>
      {isStatusSelectorOpen && <div className='statusSelector'><TaskStatusBadgeSelector /></div>}
    </div>
  )
}