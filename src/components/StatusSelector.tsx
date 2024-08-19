import TaskStatus from "./TaskStatus"

export default function StatusSelector(){
  return(
    <div id="statusSelector">
      <TaskStatus status={'completed'} includeArrow={false}/>
      <TaskStatus status={'canceled'} includeArrow={false}/>
      <TaskStatus status={'inProgress'} includeArrow={false}/>
      <TaskStatus status={'wait'} includeArrow={false}/>
      <TaskStatus status={'pendingUpdate'} includeArrow={false}/>
    </div>
  )
}