import { SearchBar } from "./SearchBar";
import { SortButton } from "./SortButton";
import { DeleteTaskButton } from "./DeleteTaskButton";
import { NewTaskButton } from "./NewTaskButton";
import { Task, checkedTasks, statusOptions } from "../../types/tasksData";
import { useEffect, useState } from "react";

type ManagementContainerProps = {
  tasks: Task[],
  checkedTasks: checkedTasks[],
  updateTasksData: (updateTasks: Task[]) => void,
  sortStatus: statusOptions,
  searchValue: string,
  updateCheckedTasksData: (updateCheckedTasks: checkedTasks[]) => void,
  handleSearchValueChange: (value: string) => void,
  handleSortStatusChange: (status: statusOptions) => () => void,
}


export const ManagementContainer = ({tasks, checkedTasks, updateTasksData, sortStatus, searchValue, updateCheckedTasksData, handleSearchValueChange, handleSortStatusChange}: ManagementContainerProps) => {
  const [nextId, setNextId] = useState(tasks.length);
  const [isSubTaskChecked2, setIsSubTaskChecked] = useState(false);


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
    updateTasksData(updateTasks);
  }

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
    updateTasksData(updateTasks)
    updateCheckedTasksData([]);
    setIsSubTaskChecked(false);
  }

  const isSubTaskChecked = (checkedTasks: checkedTasks[]) => {  
    let updateIsSubTaskChecked = false; 
    checkedTasks.forEach((task) => {
      if(task.type == 'subTask'){
        updateIsSubTaskChecked = (true);
      }
    })
    setIsSubTaskChecked(updateIsSubTaskChecked);
  }

  useEffect(() => {
    isSubTaskChecked(checkedTasks);
  },[checkedTasks])


  return(
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
  )
}