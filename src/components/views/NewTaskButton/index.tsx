import './NewTaskButton.css';
import {tasks} from '../../types/tasksData';

type newTaskProps = {
  nextId: number,
  setNextId: (value: number) => void
}

export const NewTaskButton = ({nextId, setNextId}: newTaskProps) => {
  
  const addNewTask = () => {
    tasks.push(
      {
        id: nextId,
        title: '',
        dueDate: new Date(),
        madeBy: '',
        owner: '',
        status: "pendingUpdate",
        subTasks: [],
      },
    )
    setNextId(nextId + 1);
  }

  return(
      <button className="newTaskButton" onClick={addNewTask}>+ משימה חדשה</button>
  )
}

