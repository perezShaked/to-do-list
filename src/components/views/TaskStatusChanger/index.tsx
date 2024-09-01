import { useEffect, useRef, useState } from 'react';
import './TaskStatusChanger.css'
import {ArrowIcon} from '../../elements/ArrowIcon'
import { statusOptions } from '../../types/tasksData';
import { TaskStatusSelector } from '../TaskStatusSelector'
import { TaskStatusBadge } from '../TaskStatusBadge';


type StatusProps = {
  status: statusOptions, 
  onClick: (status: statusOptions) => () => void
}

export const TaskStatusChanger = ({status, onClick}:StatusProps) => {  
  const [isStatusSelectorOpen, setIsStatusSelectorOpen] = useState(false);
  const statusSelectorRef = useRef<HTMLDivElement>(null)

  const openStatusSelector = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsStatusSelectorOpen(!isStatusSelectorOpen);
  }

  const handleStatusSelectorShowState = (e: MouseEvent) => {
    if(statusSelectorRef.current && !statusSelectorRef.current.contains(e.target as Node)){
      setIsStatusSelectorOpen(false);
    }
  }

  useEffect(() => {
    if(isStatusSelectorOpen){
      document.addEventListener('mousedown',handleStatusSelectorShowState);
    }else{
      document.removeEventListener('mousedown',handleStatusSelectorShowState);
    }   
  },[isStatusSelectorOpen])

  useEffect(() => {
    setIsStatusSelectorOpen(false);
  },[status])

  return(
    <div ref={statusSelectorRef} className='statusChanger'>
      <div className='statusContainer' onClick={openStatusSelector}>
        <TaskStatusBadge status={status}/>
        <ArrowIcon className="statusArrow" direction={isStatusSelectorOpen ? 'up' :'down'} />
      </div>
      {isStatusSelectorOpen && <div className='statusSelector'><TaskStatusSelector onClick={onClick} className='TaskStatusSelector'/></div>}
    </div>
  )
}