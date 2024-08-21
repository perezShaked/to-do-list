import './App.css';
import  {TimeStamp}  from './components/TimeStamp';
import  {SearchBar}  from './components/SearchBar';
import  {SortButton}  from './components/SortButton';
import {DeleteTaskButton} from './components/DeleteTaskButton';
import {NewTaskButton} from './components/NewTaskButton';
import {TasksContentTitles} from './components/TasksContentTitles';
import {tasks} from "./components/types/tasksData"; 
import {TaskRow} from './components/views/TaskRow/TaskRow';

const App = () => {
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
              <DeleteTaskButton/>
              <NewTaskButton />
            </div>
          </div>
          <TasksContentTitles />
          <div className='tasksContainer'>
            {tasks.map((task) => <TaskRow key={task.id} task={task}/>)}
          </div>
      </div>
    </>
  )
}

export default App
