import { gql } from '@apollo/client';

export const ADD_NEW_TASK = gql`
  mutation addNewTask(
    $madeBy: String = ""
    $owner: String = ""
    $title: String = ""
    $dueDate: Date = ""
    $taskId: Int = 10
  ) {
    createTask(
      input: {
        task: { madeBy: $madeBy, owner: $owner, title: $title, dueDate: $dueDate, taskId: $taskId }
      }
    )
  }
`;
