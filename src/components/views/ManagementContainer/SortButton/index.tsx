import { useRef, useState, useEffect, useContext } from 'react';
import { ArrowIcon } from '../../../elements';
import { StatusSelector } from '../../StatusSelector';
import { StatusOptions } from '../../../../types';
import { useOutsideClick } from '../../../hooks';
import './SortButton.css';
import { statusesContext } from '../../../../context';

type sortButtonProps = {
  onClick: (sortStatus: StatusOptions) => () => void;
  sortStatus: StatusOptions;
};

export const SortButton = ({ onClick, sortStatus }: sortButtonProps) => {
  const [isStatusSelectorOpen, setIsStatusSelectorOpen] = useState(false);
  const statusSelectorRef = useRef<HTMLDivElement>(null);

  useOutsideClick(statusSelectorRef, () => setIsStatusSelectorOpen(false));

  const onSortButtonClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsStatusSelectorOpen(!isStatusSelectorOpen);
  };

  useEffect(() => {
    setIsStatusSelectorOpen(false);
  }, [sortStatus]);

  const statuses = useContext(statusesContext);

  return (
    <div ref={statusSelectorRef} className="sortChanger">
      <button className="sortButton" onClick={onSortButtonClick}>
        {statuses && statuses[sortStatus].hebrew_name}
        <ArrowIcon className="sortButtonArrow" direction={isStatusSelectorOpen ? 'up' : 'down'} />
      </button>
      {isStatusSelectorOpen && (
        <div className="sortSelector">
          <StatusSelector onClick={onClick} className="sortStatusSelector" />
        </div>
      )}
    </div>
  );
};
