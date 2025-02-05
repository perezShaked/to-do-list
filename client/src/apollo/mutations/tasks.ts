import { gql } from '@apollo/client';

export const ADD_NEW_TASK = gql`
  mutation addNewTask {
    createTask(input: { task: {} }) {
      clientMutationId
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation updateTask(
    $id: Int!
    $dueDate: Date!
    $madeBy: String!
    $owner: String!
    $statusId: Int!
    $title: String!
  ) {
    updateTaskByTaskId(
      input: {
        taskPatch: {
          dueDate: $dueDate
          madeBy: $madeBy
          owner: $owner
          statusId: $statusId
          title: $title
        }
        id: $id
      }
    ) {
      clientMutationId
    }
  }
`;

export const DELETE_TASK = gql`
  mutation deleteTask($id: Int!) {
    updateTaskByTaskId(input: { taskPatch: { isDeleted: true }, id: $id }) {
      clientMutationId
    }
  }
`;