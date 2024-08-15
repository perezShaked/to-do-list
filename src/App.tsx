import './App.css'
import  TimeStemp  from './components/TimeStemp'
import  SearchBar  from './components/SearchBar'
import  SortButton  from './components/SortButton'

function App() {
  return (
    <>
      <TimeStemp />
      <div className='content'>
        <h1 className='header'>משימות</h1>
        <SearchBar />
        <SortButton />
      </div>

      
    </>
  )
}

export default App
