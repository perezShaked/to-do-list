import { gql } from '@apollo/client';

export const ADD_NEW_SUB_TASK = gql`
  mutation addNewSubTask($parentTaskId: Int!) {
    createSubTask(input: { subTask: { parentTaskId: $parentTaskId } }) {
      clientMutationId
    }
  }
`;

export const DELETE_SUB_TASK = gql`
  mutation deleteSubTask($subTaskId: Int!) {
    updateSubTaskBySubTaskId(input: { subTaskPatch: { isDeleted: true }, subTaskId: $subTaskId }) {
      clientMutationId
    }
  }
`;

export const UPDATE_SUBTASK = gql`
  mutation updateSubTask($subTaskId: Int!, $statusId: Int!, $title: String!) {
    updateSubTaskBySubTaskId(
      input: { subTaskPatch: { title: $title, statusId: $statusId }, subTaskId: $subTaskId }
    ) {
      clientMutationId
    }
  }
`;
