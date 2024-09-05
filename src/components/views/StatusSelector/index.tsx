import { statusOptions } from "../../types/tasksData";
import {StatusBadge} from "../StatusBadge";
import './TaskStatusSelector.css';

type StatusSelectorProps = {
  className: string,
  onClick: (status: statusOptions) => () => void
}

export const StatusSelector = ({className, onClick}: StatusSelectorProps) => {
  return(
    <div className={className}>
      <StatusBadge status={'completed'} onClick={onClick('completed')}/>
      <StatusBadge status={'canceled'} onClick={onClick('canceled')}/>
      <StatusBadge status={'inProgress'} onClick={onClick("inProgress")}/>
      <StatusBadge status={'wait'} onClick={onClick("wait")}/>
      <StatusBadge status={'pendingUpdate'} onClick={onClick("pendingUpdate")}/>
      {className === 'sortStatusSelector' && <StatusBadge status={'allStatuses'} onClick={onClick("allStatuses")}/>}
    </div>
  )
}