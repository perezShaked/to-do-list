import './TaskRow.css'
import {CheckBox} from "../../elements/CheckBox/CheckBox";
import {ArrowIcon} from '../../elements/ArrowIcon'
import {TaskStatusChanger} from "../TaskStatusChanger";
import {checkedTasks, statusOptions, Task, SubTaskType} from '../../types/tasksData';
import {useState} from "react";
import {SubTaskRow} from "./SubTask";

type TaskRowProps = {
  task: Task,
  handleCheckedTask: (taskId: number, checkedStatus: boolean, type: 'task'|'subTask', parentId: number) => void,
  checkedTasks: checkedTasks[],
  updateTaskData: (updateTask: Task, taskId: number) => void,
  isSubTasksOpen: boolean
}

export const TaskRow = ({task, handleCheckedTask, checkedTasks, updateTaskData, isSubTasksOpen}:TaskRowProps) => {
  const [showSubTasks, setShowSubTask] = useState(isSubTasksOpen);
  const haveSubTasks = task.subTasks.length > 0;

  const isTaskChecked = (taskId: number, parentId: number) => {
    const result = checkedTasks.some((t) => t.id == taskId && t.parentId == parentId);
    return result;
  }
  const [isChecked, setIsChecked] = useState(isTaskChecked(task.id, -1));

  const convertDateToString = (date:Date) => {
    return date.toISOString().split("T")[0];
  }

  const handleInputChange = (field: keyof Task) => (element: React.ChangeEvent<HTMLInputElement>) => {
    let value: string | Date = element.currentTarget.value;
    if(field === 'dueDate'){
      value = new Date(element.currentTarget.value)
    }
    const updateTask: Task = {...task, [field]:value};
    updateTaskData(updateTask, task.id);
  }; 

  const handleStatusChange = (status: statusOptions) => () => {
    const updateTask = {...task, status: status};
    updateTaskData(updateTask, task.id);
  };

  const handleCheckedStatus = ( element: React.ChangeEvent<HTMLInputElement>) => {
    const updatedChecked = element.target.checked;
    setIsChecked(updatedChecked);
    handleCheckedTask(task.id, updatedChecked, 'task', -1);
  }

  const updateSubTaskData = (updateSubTask: SubTaskType, subTaskId: number) => {
    updateTaskData({...task, subTasks: task.subTasks.map((subTask) => (subTask.id === subTaskId ? updateSubTask : subTask)) }, task.id);
  };
  console.log(task.dueDate.toISOString().split("T")[0]);
  
  return(
    <div className="taskRow">
        <div className={`task ${showSubTasks && haveSubTasks}ShowSubTasks`}>
          <div className="taskInfo">
            <CheckBox checked={isChecked} onChange={handleCheckedStatus}/>
            {
              (haveSubTasks) &&
                <ArrowIcon className="taskRowArrowButton" direction={showSubTasks ? "down" : "left"} onClick={() => {setShowSubTask(!showSubTasks)}}/>       
            }
            <input className='inputTask' value={task.title} onChange={handleInputChange('title')} style={{width:`${task.title.length}ch`}} />
            {(haveSubTasks) && <div className="numOfSubTasks">{`${task.subTasks.length}+`}</div>}
          </div>
          <input className='inputTask dueDate' type="date" value={convertDateToString(task.dueDate)} onChange={handleInputChange('dueDate')} onKeyDown={(e) => e.preventDefault()}/>
          <input className='inputTask' value={task.madeBy} onInput={handleInputChange('madeBy')}/>
          <input className='inputTask' value={task.owner} onInput={handleInputChange('owner')}/>
          <TaskStatusChanger onClick={handleStatusChange} status={task.status}/>
        </div>
        {(task.subTasks.length > 0) && showSubTasks && 
          <div>
            {task.subTasks.map((subTask) => <SubTaskRow 
                key={subTask.id} 
                updateSubTaskData={updateSubTaskData} 
                isSTChecked={isTaskChecked(subTask.id, task.id)} 
                subTask={subTask} parentId={task.id} 
                handleCheckedTask={handleCheckedTask}/>)
            }  
          </div>
        }
    </div>
    )
}
