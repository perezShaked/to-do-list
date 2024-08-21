import {TaskStatusBadge} from "./TaskStatusBadge"

export const TaskStatusBadgeSelector = () => {
  return(
    <div className="TaskStatusBadgeSelector">
      <TaskStatusBadge status={'completed'} includeArrow={false}/>
      <TaskStatusBadge status={'canceled'} includeArrow={false}/>
      <TaskStatusBadge status={'inProgress'} includeArrow={false}/>
      <TaskStatusBadge status={'wait'} includeArrow={false}/>
      <TaskStatusBadge status={'pendingUpdate'} includeArrow={false}/>
    </div>
  )
}