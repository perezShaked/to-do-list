import './App.css';
import { useState} from 'react';
import  { TimeStamp }  from './components/views/TimeStamp';
import { tasksData, checkedTasks, Task, statusOptions } from "./components/types/tasksData"; 
import { TasksContainer } from './components/views/TasksContainer'
import { ManagementContainer } from './components/views/ManagementContainer';

const App = () => {
  const [tasks, setTasks] = useState<Task[]>(tasksData)
  const [checkedTasks, setCheckedTasks] = useState<checkedTasks[]>([]);
  const [sortStatus, setSortStatus] = useState<statusOptions>('allStatuses')
  const [searchValue, setSearchValue] = useState<string>('')

  const updateTaskData = (updateTask: Task, taskId: number) => {
    setTasks(() => tasks.map((task) => (task.id === taskId ? updateTask : task)));
  };

  const updateTasksData = (updateTasks: Task[]) => {
    setTasks(updateTasks);
  }

  const updateCheckedTasksData = (updateCheckedTasks: checkedTasks[]) => {
    setCheckedTasks(updateCheckedTasks)
  }

  const handleSortStatusChange = (status: statusOptions) => () => {
    if(status != sortStatus)
      setSortStatus(status);
  }

  const handleSearchValueChange = (value: string) => {
    setSearchValue(value);
  }

  return (
    <>
      <TimeStamp />
      <div className='appContainer'>
        <div className='header'>משימות</div>
          <ManagementContainer
              tasks={tasks}
              searchValue={searchValue} 
              sortStatus={sortStatus} 
              checkedTasks={checkedTasks}
              updateTasksData={updateTasksData}
              updateCheckedTasksData={updateCheckedTasksData}
              handleSearchValueChange={handleSearchValueChange}
              handleSortStatusChange={handleSortStatusChange}/>
          <TasksContainer 
              tasks={tasks} 
              searchValue={searchValue} 
              sortStatus={sortStatus} 
              updateTaskData={updateTaskData}
              checkedTasks={checkedTasks}
              updateCheckedTasksData={updateCheckedTasksData}/>
      </div>
    </>
  )
}

export default App
