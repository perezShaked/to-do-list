import './TaskStatusBadge.css'
import { statusOptions } from '../../types/tasksData';
import { statuses } from '../../types/tasksData';

type StatusProps = {
  status: statusOptions,
  onClick?: () => void
};

export const TaskStatusBadge = ({status, onClick}:StatusProps) => {
  return(
    <div>
      <button className={`status`} onClick={onClick} style={{backgroundColor: (statuses.get(status)?.color)}} >
        {statuses.get(status)?.hebrewName}
      </button>
    </div>
  )
}