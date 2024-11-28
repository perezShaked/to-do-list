import { useEffect, useRef, useState } from 'react';
import { ArrowIcon } from '../../../../elements';
import { StatusOptions } from '../../../../../types';
import { useOutsideClick } from '../../../../../hooks';
import { StatusSelector } from '../../../StatusSelector';
import { StatusBadge } from '../../../StatusBadge';
import './TaskStatusChanger.css';

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
