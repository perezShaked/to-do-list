import './App.css';
import  {TimeStemp}  from './components/TimeStemp';
import  SearchBar  from './components/SearchBar';
import  SortButton  from './components/SortButton';
import DeleteTaskButton from './components/DeleteTaskButton';
import NewTaskButton from './components/NewTaskButton';
import Titles from './components/Titles';
import { tasks } from "./tasksData"; 
import TaskRow from './components/TaskRow';

function App() {
  return (
    <>
      <TimeStemp />
      <div className='content'>
        <h1 className='header'>משימות</h1>
          <div className='content2'>
            <div className='serchAndSort'>
              <SearchBar />
              <SortButton />
            </div>
            <div className='addAndDelete'>
              <DeleteTaskButton/>
              <NewTaskButton />
            </div>
          </div>
          <Titles />
          {tasks.map((t) => <TaskRow key={t.id} task={t}/>)}
      </div>
    </>
  )
}

export default App
