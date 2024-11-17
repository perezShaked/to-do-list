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
