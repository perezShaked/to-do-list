import './TaskRow.css'
import {CheckBox} from "../../elements/CheckBox/CheckBox";
import {ArrowIcon} from '../../elements/ArrowIcon'
import {TaskStatusChanger} from "../TaskStatusChanger";
import {Task} from '../../types/tasksData';
import {useState} from "react";
import {SubTask} from "./SubTask";
import { taskContext } from '../../hooks/context';

type TaskRowProps = {receivedTask: Task}

export const TaskRow = ({receivedTask}:TaskRowProps) => {
  const [showSubTasks, setShowSubTask] = useState(false);
  const [task, setTask] = useState<Task>(receivedTask);

  const openSubTasks = () => {
    setShowSubTask(!showSubTasks);
  }

  const convertDateToString = (date:Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }

  const handleInputChange = (field: string) => (element: React.FormEvent<HTMLInputElement>) => {
    setTask({...task, [field]:(element.currentTarget.value)})
    console.log(task);
  }; 


  return(
    <div className="taskRow">
      <taskContext.Provider value={{task, setTask}}>
        <div className={`task ${showSubTasks}ShowSubTasks`}>
          <div className="taskInfo">
            <CheckBox/>
            {
              (task.subTasks.length > 0) &&
                <ArrowIcon className="taskRowArrowButton" direction={showSubTasks ? "down" : "left"} onClick={openSubTasks}/>       
            }
            <input className='inputTask taskLabel' value={task.title} onInput={handleInputChange('title')} />
            {(task.subTasks.length > 0) && <div className="numOfSubTasks">{`${task.subTasks.length}+`}</div>}
          </div>
          <input className='inputTask dueDate' type="date" value={convertDateToString(task.dueDate)}/>
          <input className='inputTask' value={task.madeBy} onInput={handleInputChange('madeBy')}/>
          <input className='inputTask' value={task.owner} onInput={handleInputChange('owner')}/>
          <TaskStatusChanger status={task.status}/>
        </div>
        {(task.subTasks.length > 0) && showSubTasks && 
          <div>
            {task.subTasks.map((subTask) => <SubTask key={subTask.id} status={subTask.status} title={subTask.title}/>)}  
          </div>
        }
      </taskContext.Provider>
    </div>
    )
}
