import { useEffect, useRef, useState, useContext } from 'react';
import './TaskStatusChanger.css';
import { ArrowIcon } from '../../../../elements/ArrowIcon';
import { StatusOptions } from '../../../../../types';
import { StatusSelector } from '../../../StatusSelector';
import { StatusBadge } from '../../../StatusBadge';
import { useOutsideClick } from '../../../../hooks/useOutsideClick';
import { statusesContext } from '../../../../../context';

type StatusProps = {
  statusId: number;
  onClick: (status: StatusOptions) => () => void;
};

export const TaskStatusChanger = ({ statusId, onClick }: StatusProps) => {
  const [isStatusSelectorOpen, setIsStatusSelectorOpen] = useState(false);
  const statusSelectorRef = useRef<HTMLDivElement>(null);

  const openStatusSelector = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsStatusSelectorOpen(!isStatusSelectorOpen);
  };

  useOutsideClick(statusSelectorRef, () => setIsStatusSelectorOpen(false));

  useEffect(() => {
    setIsStatusSelectorOpen(false);
  }, [statusId]);

  return (
    <div ref={statusSelectorRef} className="statusChanger">
      <div className="statusContainer">
        <div className="statusBadgeContainer" onClick={openStatusSelector}>
          <StatusBadge statusId={statusId} />
          <ArrowIcon className="statusArrow" direction={isStatusSelectorOpen ? 'up' : 'down'} />
        </div>
        {isStatusSelectorOpen && (
          <div className="statusChangerSelector">
            <StatusSelector onClick={onClick} className="taskStatusSelector" />
          </div>
        )}
      </div>
    </div>
  );
};
