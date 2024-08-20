import Status from "./Status"

export default function StatusSelector(){
  return(
    <div id="statusSelector">
      <Status status={'completed'} includeArrow={false}/>
      <Status status={'canceled'} includeArrow={false}/>
      <Status status={'inProgress'} includeArrow={false}/>
      <Status status={'wait'} includeArrow={false}/>
      <Status status={'pendingUpdate'} includeArrow={false}/>
    </div>
  )
}