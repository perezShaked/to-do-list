import './TaskStatusBadge.css';
import { StatusOptions } from '../../../types';
import clsx from 'clsx';
import { useContext } from 'react';
import { statusesContext } from '../../../context';

type StatusProps = {
  status: StatusOptions;
  onClick?: () => void;
};

export const StatusBadge = ({ status, onClick }: StatusProps) => {
  const statuses = useContext(statusesContext);

  return (
    <button
      className={clsx('status', status)}
      onClick={onClick}
      style={{ backgroundColor: statuses && statuses[status].color }}
    >
      {statuses && statuses[status].hebrew_name}
    </button>
  );
};
