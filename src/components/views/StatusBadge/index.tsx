import './TaskStatusBadge.css'
import { statusOptions } from '../../types/tasksData';
import { statuses } from '../../types/tasksData';

type StatusProps = {
  status: statusOptions,
  onClick?: () => void
};

export const StatusBadge = ({status, onClick}:StatusProps) => {
  return(
    <button className={`status ${status}`} onClick={onClick} style={{backgroundColor: (statuses[status].color)}} >
      {statuses[status].hebrewName}
    </button>
  )
}