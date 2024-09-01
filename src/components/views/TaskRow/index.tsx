import './TaskRow.css'
import {CheckBox} from "../../elements/CheckBox/CheckBox";
import {ArrowIcon} from '../../elements/ArrowIcon'
import {TaskStatusChanger} from "../TaskStatusChanger";
import {statusOptions, Task} from '../../types/tasksData';
import {useState} from "react";
import {SubTaskRow} from "./SubTask";

type TaskRowProps = {
  receivedTask: Task,
  handleCheckedTask: (taskId: number, checkedStatus: boolean) => void,
}

export const TaskRow = ({receivedTask, handleCheckedTask}:TaskRowProps) => {
  const [showSubTasks, setShowSubTask] = useState(false);
  const [task, setTask] = useState<Task>(receivedTask);
  const [isChecked, setIsChecked] = useState(false);

  const openSubTasks = () => {
    setShowSubTask(!showSubTasks);
  }

  const convertDateToString = (date:Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }

  const handleInputChange = (field: keyof Task) => (element: React.FormEvent<HTMLInputElement>) => {
    setTask({...task, [field]:(element.currentTarget.value)})
  }; 

  const handleStatusChange = (status: statusOptions) => () => {
    setTask({...task, status: status})
  };

  const handleCheckedStatus = ( element: React.ChangeEvent<HTMLInputElement>) => {
    const updatedChecked = element.target.checked;
    setIsChecked(updatedChecked);
    handleCheckedTask(task.id, updatedChecked);
  }

  return(
    <div className="taskRow">
        <div className={`task ${showSubTasks}ShowSubTasks`}>
          <div className="taskInfo">
            <CheckBox checked={isChecked} onChange={handleCheckedStatus}/>
            {
              (task.subTasks.length > 0) &&
                <ArrowIcon className="taskRowArrowButton" direction={showSubTasks ? "down" : "left"} onClick={openSubTasks}/>       
            }
            <input className='inputTask taskLabel' value={task.title} onInput={handleInputChange('title')} />
            {(task.subTasks.length > 0) && <div className="numOfSubTasks">{`${task.subTasks.length}+`}</div>}
          </div>
          <input className='inputTask dueDate' type="date" value={convertDateToString(task.dueDate)} onInput={() => {}}/>
          <input className='inputTask' value={task.madeBy} onInput={handleInputChange('madeBy')}/>
          <input className='inputTask' value={task.owner} onInput={handleInputChange('owner')}/>
          <TaskStatusChanger onClick={handleStatusChange} status={task.status}/>
        </div>
        {(task.subTasks.length > 0) && showSubTasks && 
          <div>
            {task.subTasks.map((subTask) => <SubTaskRow key={subTask.id} receivedSubTask={subTask} handleCheckedTask={handleCheckedTask}/>)}  
          </div>
        }
    </div>
    )
}
