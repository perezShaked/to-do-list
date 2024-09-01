import './App.css';
import  {TimeStamp}  from './components/views/TimeStamp';
import  {SearchBar}  from './components/views/SearchBar';
import  {SortButton}  from './components/views/SortButton';
import {DeleteTaskButton} from './components/views/DeleteTaskButton';
import {NewTaskButton} from './components/views/NewTaskButton';
import {TasksContentTitles} from './components/views/TasksContentTitles';
import {tasks} from "./components/types/tasksData"; 
import {TaskRow} from './components/views/TaskRow';
import { useState } from 'react';

const App = () => {
  const [nextId, setNextId] = useState(2);
  const [checkedTasksId, setCheckedTasksId] = useState(new Set<number>());

  const handleDeleteTask = () => () => {

  }

  const handleCheckedTask = (taskId: number, checkedStatus: boolean) => {
    const updateCheckedTasksId = checkedTasksId;
    if(checkedStatus){
      updateCheckedTasksId.add(taskId);
      setCheckedTasksId(updateCheckedTasksId);
    }else{
      updateCheckedTasksId.delete(taskId);
      setCheckedTasksId(updateCheckedTasksId);
    }
    console.log(updateCheckedTasksId);
  }
  
  return (
    <>
      <TimeStamp />
      <div className='appContainer'>
        <div className='header'>משימות</div>
          <div className='manageContainer'>
            <div className='searchAndSort'>
              <SearchBar />
              <SortButton />
            </div>
            <div className='addAndDelete'>
              <DeleteTaskButton onClick={handleDeleteTask()}/>
              <NewTaskButton nextId={nextId} setNextId={setNextId}/>
            </div>
          </div>
          <TasksContentTitles />
          <div className='tasksContainer'>
            {tasks.map((task) => <TaskRow key={task.id} receivedTask={task} handleCheckedTask={handleCheckedTask}/>)}
          </div>
      </div>
    </>
  )
}

export default App
