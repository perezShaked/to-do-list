import { gql } from '@apollo/client';

export const ADD_NEW_TASK = gql`
  mutation addNewTask {
    createTask(input: { task: {} }) {
      clientMutationId
    }
  }
`;
