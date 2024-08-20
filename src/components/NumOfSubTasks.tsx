import "./components_style/NumOfSubTasks.css"

export default function NumOfSubTasks({numOfSubTasks}:{numOfSubTasks:number}){
  return(
    <>
      {(numOfSubTasks > 0) ? <div id="numOfSubTasks">{`${numOfSubTasks}+`}</div> : null}
    </>
    
  )
}