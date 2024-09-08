import './SortButton.css'
import { useRef, useState, useEffect } from 'react';
import { ArrowIcon } from '../../../elements/ArrowIcon'
import { StatusSelector } from '../../StatusSelector';
import { statusOptions } from '../../../types/tasksData';
import { statuses } from '../../../types/tasksData';
import { useOutsideClick } from '../../../hooks/useOutsideClick';

type sortButtonProps = {
  onClick: (sortStatus: statusOptions) => () => void,
  sortStatus: statusOptions
}

export const SortButton = ({onClick, sortStatus}:sortButtonProps) => {
  const [isStatusSelectorOpen, setIsStatusSelectorOpen] = useState(false);
  const statusSelectorRef = useRef<HTMLDivElement>(null)

  useOutsideClick(statusSelectorRef, () => setIsStatusSelectorOpen(false));
  
  const onSortButtonClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsStatusSelectorOpen(!isStatusSelectorOpen);
  }

  useEffect(() => {
    setIsStatusSelectorOpen(false);
  },[sortStatus])

  return(
    <div ref={statusSelectorRef}  className='sortChanger'>
      <button className="sortButton" onClick={onSortButtonClick}>{statuses[sortStatus].hebrewName}<ArrowIcon className='sortButtonArrow' direction={isStatusSelectorOpen ? 'up' :'down'}/></button>
      {isStatusSelectorOpen && <div className='sortSelector'><StatusSelector onClick={onClick} className='sortStatusSelector'/></div>}
    </div>   
  )
}

