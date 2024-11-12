import './TaskStatusBadge.css';
import { StatusOptions } from '../../../types';
import clsx from 'clsx';
import { useContext } from 'react';
import { statusesContext } from '../../../context';

type StatusProps = {
  statusId: number;
  onClick?: () => void;
};

export const StatusBadge = ({ statusId, onClick }: StatusProps) => {
  const statuses = useContext(statusesContext);

  return (
    <button
      className={clsx('status', 'status' + statusId)}
      onClick={onClick}
      style={{ backgroundColor: statuses && statuses[statusId].color }}
    >
      {statuses && statuses[statusId].hebrew_name}
    </button>
  );
};
