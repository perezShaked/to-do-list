import './App.css';
import  {TimeStamp}  from './components/views/TimeStamp';
import  {SearchBar}  from './components/views/SearchBar';
import  {SortButton}  from './components/views/SortButton';
import {DeleteTaskButton} from './components/views/DeleteTaskButton';
import {NewTaskButton} from './components/views/NewTaskButton';
import {TasksContentTitles} from './components/views/TasksContentTitles';
import {tasksData, checkedTasks, Task, SubTaskType} from "./components/types/tasksData"; 
import {TaskRow} from './components/views/TaskRow';
import { useState } from 'react';



const App = () => {
  const [nextId, setNextId] = useState(5);
  const [checkedTasks, setCheckedTasks] = useState<checkedTasks[]>([]);
  const [tasks, setTasks] = useState<Task[]>(tasksData)

  const updateTaskData = (updateTask: Task, taskId: number) => {
      setTasks(() => tasks.map((task) => (task.id === taskId ? updateTask : task)));
  };

  const handleDeleteTask = () => () => {
    
  }

  const handleCheckedTask = (taskId: number, checkedStatus: boolean, type: 'task'|'subTask', parentId: number) => {
    if(checkedStatus){
      setCheckedTasks([...checkedTasks, {id: taskId, type: type, parentId: parentId}]);
    }else{
      setCheckedTasks([...checkedTasks].filter(task => {taskId !== task.id}));
    }
  }

  const handleAddNewTask = () => {
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
              <NewTaskButton onClick={handleAddNewTask} />
            </div>
          </div>
          <TasksContentTitles />
          <div className='tasksContainer'>
            {tasks.map((task) => <TaskRow key={task.id} checkedTasks={checkedTasks} updateTaskData={updateTaskData} task={task} handleCheckedTask={handleCheckedTask}/>)}
          </div>
      </div>
    </>
  )
}

export default App
