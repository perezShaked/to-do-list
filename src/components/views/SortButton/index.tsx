import './SortButton.css'
import {ArrowIcon} from '../../elements/ArrowIcon'
import { useRef, useState, useEffect } from 'react';
import { TaskStatusSelector } from '../TaskStatusSelector';

export const SortButton = () => {
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
    <div ref={statusSelectorRef}  className='sortChanger'>
      <button className="sortButton" onClick={openStatusSelector}>כל הסטטוסים<ArrowIcon className='sortButtonArrow' direction={isStatusSelectorOpen ? 'up' :'down'}/></button>
      {isStatusSelectorOpen && <div className='sortSelector'><TaskStatusSelector className='sortStatusSelector'/></div>}
    </div>   
  )
}

