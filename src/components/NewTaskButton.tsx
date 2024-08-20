import './components_style/NewTaskButton.css'
import {tasks} from '../tasksData'
import { useState } from 'react'


export default function NewTaskButton(){
  const [idCounter, setIdCounter] = useState(0);

  const addNewTask = () => {
    tasks.push(
      {
        id: idCounter,
        isMarked: false,
        title: '',
        dueDate: '0000-00-00',
        madeBy: '',
        owner: '',
        status: 'pendingUpdate',
        subTasks: []
      }
    )
    setIdCounter(idCounter + 1);
    console.log(tasks);
  }

  return(
    <>
      <button id="newTaskButton" onClick={addNewTask}>+ משימה חדשה</button>
    </>
  )
}

