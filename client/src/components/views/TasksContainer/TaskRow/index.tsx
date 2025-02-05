import clsx from 'clsx';
import { useEffect, useState, useRef } from 'react';
import { MutationFunction } from '@apollo/client';
import { CheckedTask, StatusOptions, Task, SubTask, TasksTypes } from '../../../../types';
import { CheckBox } from '../../../elements';
import { ArrowIcon } from '../../../elements';
import { TaskStatusChanger } from './TaskStatusChanger';
import { SubTaskRow } from './SubTask';
import './TaskRow.css';

type TaskRowProps = {
  task: Task;
  manageTasksSelection: (
    taskId: number,
    checkedStatus: boolean,
    type: TasksTypes,
    parentId: number
  ) => void;
  isTaskChecked: boolean;
  updateTaskData: (updatedTask: Task, taskId: number) => void;
  updateSubTask: MutationFunction;
  sortStatus: StatusOptions;
  checkedSubTasks: CheckedTask[];
};

export const TaskRow = ({
  task,
  manageTasksSelection,
  isTaskChecked,
  updateTaskData,
  updateSubTask,
  sortStatus,
  checkedSubTasks,
}: TaskRowProps) => {
  const [showSubTasks, setShowSubTask] = useState(false);
  const [taskTitle, setTaskTitle] = useState(task.title);
  const [taskDueDate, setTaskDueDate] = useState(task.dueDate);
  const [taskMadeBy, setTaskMadeBy] = useState(task.madeBy);
  const [taskOwner, setTaskOwner] = useState(task.owner);
  const [isChecked, setIsChecked] = useState(isTaskChecked);
  const haveSubTasks = task.subTasks.length > 0;

  const isSubTaskChecked = (subTaskId: number): boolean =>
    checkedSubTasks.some((subTask) => subTaskId === subTask.id);

  const handleInputChange = (field: keyof Task) => (event: React.ChangeEvent<HTMLInputElement>) => {
    let value: string | Date = event.currentTarget.value;
    if (field === 'dueDate') {
      value = new Date(event.target.value);
      if (isNaN(value.getTime())) {
        event.preventDefault();
        event.target.focus();
      }
    }
    const updatedTask: Task = { ...task, [field]: value };
    updateTaskData(updatedTask, task.id);
  };

  const handleStatusChange = (status: StatusOptions) => () => {
    const updatedTask = { ...task, statusId: status };
    updateTaskData(updatedTask, task.id);
  };

  const handleCheckBox = ({ target: { checked } }: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(checked);
    if (checked) {
      setShowSubTask(true);
    }
    manageTasksSelection(task.id, checked, TasksTypes.TASK, -1);
  };

  const updateSubTaskData = async ({ title, statusId }: SubTask, id: number) => {
    await updateSubTask({
      variables: {
        id,
        title,
        statusId,
      },
    });
  };

  const prevSortStatus = useRef(sortStatus);
  const subTasksExpanded =
    (prevSortStatus.current !== sortStatus && sortStatus !== StatusOptions.ALL_STATUSES) ||
    showSubTasks;

  useEffect(() => {
    prevSortStatus.current = sortStatus;
  }, [sortStatus]);

  return (
    <div className="taskRow">
      <div className={clsx('task', { ShowSubTasks: subTasksExpanded && haveSubTasks })}>
        <div className="taskInfo">
          <CheckBox checked={isChecked} onChange={handleCheckBox} />
          {haveSubTasks && (
            <ArrowIcon
              className="taskRowArrowButton"
              direction={subTasksExpanded ? 'down' : 'left'}
              onClick={() => {
                setShowSubTask(!showSubTasks);
              }}
            />
          )}
          <input
            className="inputTask"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            onBlur={handleInputChange('title')}
          />
          {haveSubTasks && <div className="numOfSubTasks">{`${task.subTasks.length}+`}</div>}
        </div>
        <input
          className="inputTask dueDate"
          type="date"
          value={taskDueDate}
          onChange={(e) => setTaskDueDate(e.target.value)}
          onBlur={handleInputChange('dueDate')}
        />
        <input
          className="inputTask"
          value={taskMadeBy}
          onChange={(e) => setTaskMadeBy(e.target.value)}
          onBlur={handleInputChange('madeBy')}
        />
        <input
          className="inputTask"
          value={taskOwner}
          onChange={(e) => setTaskOwner(e.target.value)}
          onBlur={handleInputChange('owner')}
        />
        {<TaskStatusChanger onClick={handleStatusChange} statusId={task.statusId} />}
      </div>
      {task.subTasks.length > 0 && subTasksExpanded && (
        <div>
          {task.subTasks.map((subTask) => (
            <SubTaskRow
              key={subTask.id}
              updateSubTaskData={updateSubTaskData}
              isSubTaskChecked={isSubTaskChecked(subTask.id || 0)}
              subTask={subTask}
              parentId={task.id}
              manageTasksSelection={manageTasksSelection}
            />
          ))}
        </div>
      )}
    </div>
  );
};
