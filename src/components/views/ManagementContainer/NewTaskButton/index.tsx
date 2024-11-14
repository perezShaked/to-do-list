import { useMutation } from '@apollo/client';
import './NewTaskButton.css';
import { ADD_NEW_SUB_TASK, ADD_NEW_TASK } from '../../../../services';
import { CheckedTask } from '../../../../types';

type newTaskProps = {
  disabled: boolean;
  checkedTasks: CheckedTask[];
};

export const NewTaskButton = ({ disabled, checkedTasks }: newTaskProps) => {
  const [addNewTask] = useMutation(ADD_NEW_TASK);
  const [addNewSubTask] = useMutation(ADD_NEW_SUB_TASK);

  const handleNewTaskButtonClick = async () => {
    if (checkedTasks.length > 0) {
      checkedTasks.forEach(async (checkedTask) => {
        await addNewSubTask({
          variables: {
            parentTaskId: checkedTask.id,
          },
        });
        console.log('Sub Task created successfully');
      });
    } else {
      await addNewTask();
      console.log('Task created successfully');
    }
  };

  return (
    <button className="newTaskButton" disabled={disabled} onClick={handleNewTaskButtonClick}>
      + משימה חדשה
    </button>
  );
};
