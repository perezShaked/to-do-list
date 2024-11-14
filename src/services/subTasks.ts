import { gql } from '@apollo/client';

export const ADD_NEW_SUB_TASK = gql`
  mutation addNewSubTask($parentTaskId: Int!) {
    createSubTask(input: { subTask: { parentTaskId: $parentTaskId } }) {
      clientMutationId
    }
  }
`;
