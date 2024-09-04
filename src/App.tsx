import './App.css';
import  {TimeStamp}  from './components/views/TimeStamp';
import  {SearchBar}  from './components/views/SearchBar';
import  {SortButton}  from './components/views/SortButton';
import {DeleteTaskButton} from './components/views/DeleteTaskButton';
import {NewTaskButton} from './components/views/NewTaskButton';
import {TasksContentTitles} from './components/views/TasksContentTitles';
import {tasksData, checkedTasks, Task, statusOptions} from "./components/types/tasksData"; 
import {TaskRow} from './components/views/TaskRow';
import { useState, useEffect, useMemo } from 'react';

const App = () => {
  const [nextId, setNextId] = useState(5);
  const [checkedTasks, setCheckedTasks] = useState<checkedTasks[]>([]);
  const [tasks, setTasks] = useState<Task[]>(tasksData)
  const [isSubTaskChecked2, setIsSubTaskChecked] = useState(false);
  const [sortStatus, setSortStatus] = useState<statusOptions>('allStatuses')
  const [searchValue, setSearchValue] = useState<string>('')
  const [isFiltered, setIsFiltered] = useState(false);


  const updateTaskData = (updateTask: Task, taskId: number) => {
      setTasks(() => tasks.map((task) => (task.id === taskId ? updateTask : task)));
  };

  const handleDeleteTask = () => {
    let updateTasks = [...tasks]
    checkedTasks.map((checkedTask) => {
      if(checkedTask.type == 'subTask'){
        updateTasks = updateTasks.map(task => {
          if(task.id == checkedTask.parentId){
            return{
              ...task,
              subTasks: task.subTasks.filter(task => task.id != checkedTask.id)
            };
          }return task;
        })
      }else{
        updateTasks = (updateTasks.filter(task => task.id != checkedTask.id))
      }
    })
    setTasks(updateTasks)
    setCheckedTasks([]);
    setIsSubTaskChecked(false);
  }

  const handleCheckedTask = (taskId: number, checkedStatus: boolean, type: 'task'|'subTask', parentId: number) => {
    let updateCheckedTasks = [...checkedTasks];
    if(checkedStatus){
      updateCheckedTasks = [...updateCheckedTasks, {id: taskId, type: type, parentId: parentId}];
    }else{
      updateCheckedTasks = [...updateCheckedTasks].filter((task) => taskId !== task.id);
    }
    setCheckedTasks(updateCheckedTasks);
    isSubTaskChecked(updateCheckedTasks);
  }

  const isSubTaskChecked = (updateCheckedTasks: checkedTasks[]) => {  
    let updateIsSubTaskChecked = false; 
    updateCheckedTasks.forEach((task) => {
      if(task.type == 'subTask'){
        updateIsSubTaskChecked = (true);
      }
    })
    setIsSubTaskChecked(updateIsSubTaskChecked);
  }

  const handleAddNewTask = () => {
    let updateTasks = [...tasks];
    if(checkedTasks.length != 0){
      checkedTasks.forEach((checkedTask) => {
        updateTasks.forEach((task) => {
          if(checkedTask.id == task.id){
            let nextSubTaskId = 0;
            if(task.subTasks.length > 0){
              nextSubTaskId = task.subTasks[task.subTasks.length-1].id + 1;
            }
            task.subTasks.push({
              id: nextSubTaskId,
              title: '',
              status: 'pendingUpdate'
            })
          }
        })
      })
    }else{
      updateTasks.push(
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
    setTasks(updateTasks);
  }

  const handleSortStatusChange = (status: statusOptions) => () => {
    setSortStatus(status);
  }

  const sortedTasks = useMemo(
    ():Task[] => {
      if(sortStatus === 'allStatuses' && searchValue === '')
        return tasks;
  
      const updateTasks = tasks.map((task) => {
        return {
          ...task,
          subTasks: task.subTasks.filter(subTask => ((subTask.status === sortStatus || sortStatus === 'allStatuses') && subTask.title.includes(searchValue))),
        }})
  
      return updateTasks.filter((task) => {
        return (((task.status === sortStatus || sortStatus === 'allStatuses')) && task.title.includes(searchValue) || task.subTasks.length > 0)
      })
    },[sortStatus, searchValue])
 

  useEffect(() => {  
    if (sortStatus !== 'allStatuses' || searchValue !== '') {
      setIsFiltered(true);
    } else {
      setIsFiltered(false);
    }
  }, [sortStatus, searchValue]);

  const handleSearchValueChange = (value: string) => {
    setSearchValue(value);
  }

  return (
    <>
      <TimeStamp />
      <div className='appContainer'>
        <div className='header'>משימות</div>
          <div className='manageContainer'>
            <div className='searchAndSort'>
              <SearchBar value={searchValue} onChange={handleSearchValueChange}/>
              <SortButton onClick={handleSortStatusChange} sortStatus={sortStatus} />
            </div>
            <div className='addAndDelete'>
              <DeleteTaskButton onClick={handleDeleteTask}/>
              <NewTaskButton onClick={handleAddNewTask} disabled={isSubTaskChecked2}/>
            </div>
          </div>
          <TasksContentTitles />
          <div className='tasksContainer'>
            {sortedTasks.map((task) => <TaskRow 
                      key={task.id} 
                      checkedTasks={checkedTasks} 
                      updateTaskData={updateTaskData} 
                      task={task} 
                      handleCheckedTask={handleCheckedTask}
                      isSubTasksOpen={isFiltered}/>)}
          </div>
      </div>
    </>
  )
}

export default App
