import {TaskStatusBadge} from "../TaskStatusBadge";
import './TaskStatusSelector.css';

type StatusSelectorProps = {
  className: string
}

export const TaskStatusSelector = ({className}: StatusSelectorProps) => {
  return(
    <div className={className}>
      <TaskStatusBadge status={'completed'}/>
      <TaskStatusBadge status={'canceled'}/>
      <TaskStatusBadge status={'inProgress'}/>
      <TaskStatusBadge status={'wait'}/>
      <TaskStatusBadge status={'pendingUpdate'}/>
    </div>
  )
}