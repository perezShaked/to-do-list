import { statusOptions } from "../../types/tasksData";
import {TaskStatusBadge} from "../TaskStatusBadge";
import './TaskStatusSelector.css';

type StatusSelectorProps = {
  className: string,
  onClick: (status: statusOptions) => () => void
}

export const TaskStatusSelector = ({className, onClick}: StatusSelectorProps) => {
  return(
    <div className={className}>
      <TaskStatusBadge status={'completed'} onClick={onClick('completed')}/>
      <TaskStatusBadge status={'canceled'} onClick={onClick('canceled')}/>
      <TaskStatusBadge status={'inProgress'} onClick={onClick("inProgress")}/>
      <TaskStatusBadge status={'wait'} onClick={onClick("wait")}/>
      <TaskStatusBadge status={'pendingUpdate'} onClick={onClick("pendingUpdate")}/>
      {className === 'sortStatusSelector' && <TaskStatusBadge status={'allStatuses'} onClick={onClick("allStatuses")}/>}
    </div>
  )
}