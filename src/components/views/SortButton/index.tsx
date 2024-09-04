import './SortButton.css'
import {ArrowIcon} from '../../elements/ArrowIcon'
import { useRef, useState, useEffect } from 'react';
import { TaskStatusSelector } from '../TaskStatusSelector';
import { statusOptions } from '../../types/tasksData';
import { statuses } from '../../types/tasksData';


type sortButtonProps = {
  onClick: (sortStatus: statusOptions) => () => void,
  sortStatus: statusOptions
}

export const SortButton = ({onClick, sortStatus}:sortButtonProps) => {
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

  useEffect(() => {
    setIsStatusSelectorOpen(false);
  },[sortStatus])

  return(
    <div ref={statusSelectorRef}  className='sortChanger'>
      <button className="sortButton" onClick={openStatusSelector}>{statuses.get(sortStatus)?.hebrewName}<ArrowIcon className='sortButtonArrow' direction={isStatusSelectorOpen ? 'up' :'down'}/></button>
      {isStatusSelectorOpen && <div className='sortSelector'><TaskStatusSelector onClick={onClick} className='sortStatusSelector'/></div>}
    </div>   
  )
}

