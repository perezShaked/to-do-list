import TaskRow from "./TaskRow"

export default function Tasks(){
  return(
    <div id='tasks'>
      <div id='lables'>
        <label id="endDateLable">תאריך לביצוע</label>
        <label id="madeByLable">יוצר</label>
        <label id="OwnerLable">בעלים</label>
      </div>
      <div id="tasksRows">
        <TaskRow taskStatus='inProgress' />
        <TaskRow taskStatus='canceled' />
        <TaskRow taskStatus='pendingUpdate' />
      </div>
    </div>

  )
}