import { gql } from '@apollo/client';



export const GET_SUB_TASKS_BY_TASK_ID = gql`
  query getSubTasksByTaskId($parentTaskId: Int = 10) {
    allSubTasks(condition: { isDeleted: false, parentTaskId: $parentTaskId }) {
      nodes {
        title
        statusId
      }
    }
  }
`;

export const GET_ALL_TASKS = gql`
  query getAllTasks {
    allTasks(condition: { isDeleted: false }) {
      nodes {
        dueDate
        madeBy
        owner
        statusId
        title
      }
    }
  }
`;
