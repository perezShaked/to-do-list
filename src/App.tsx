import './App.css'
import  TimeStemp  from './components/TimeStemp'
import  SearchBar  from './components/SearchBar'
import  SortButton  from './components/SortButton'
import DeleteTaskButton from './components/DeleteTaskButton'
import DuplicateTaskButton from './components/DuplicateTaskButton'
import NewTaskButton from './components/NewTaskButton'

function App() {
  return (
    <>
      <TimeStemp />
      <div className='content'>
        <h1 className='header'>משימות</h1>
        <div className='content2'>
          <SearchBar />
          <SortButton />
        </div>
        <div className='content2'>
          <DeleteTaskButton/>
          <DuplicateTaskButton />
          <NewTaskButton />
        </div>
      </div>

      
    </>
  )
}

export default App
