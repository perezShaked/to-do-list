import {TaskStatusBadge} from "./TaskStatusBadge"

export const TaskStatusBadgeSelector = () => {
  return(
    <div className={`TaskStatusBadgeSelector`}>
      <TaskStatusBadge status={'completed'}/>
      <TaskStatusBadge status={'canceled'}/>
      <TaskStatusBadge status={'inProgress'}/>
      <TaskStatusBadge status={'wait'}/>
      <TaskStatusBadge status={'pendingUpdate'}/>
    </div>
  )
}