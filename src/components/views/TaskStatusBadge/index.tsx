import './TaskStatusBadge.css'
import { statusOptions } from '../../types/tasksData';
import { taskContext } from '../../hooks/context';
import { useContext } from 'react';


const statuses = new Map<string, {hebrewName:string, color: string}>([
  ['wait',
     {hebrewName:'מחכה', color: '#2999ED'}],
  ['pendingUpdate',
     {hebrewName:'ממתין לעדכון', color: '#929292'}],
  ['completed',
     {hebrewName:'בוצע', color: '#2D8B00'}],
  ['canceled',
     {hebrewName:'בוטל', color: '#F85359'}],
  ['inProgress',
     {hebrewName:'בעבודה', color: '#F0AD00'}],
]);

type StatusProps = {
  status: statusOptions
};

export const TaskStatusBadge = ({status}:StatusProps) => {
  const context = useContext(taskContext)

  const handleStatusChange = () => {
    context.setTask({...context?.task, status: status});
  }
  return(
    <div>
      <button className={`status`} onClick={handleStatusChange} style={{backgroundColor: (statuses.get(status)?.color)}} >
        {statuses.get(status)?.hebrewName}
      </button>
    </div>
  )
}