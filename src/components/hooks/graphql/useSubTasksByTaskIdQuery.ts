import { gql, useQuery } from '@apollo/client';

export const GET_SUB_TASKS_BY_TASK_ID = gql`
  query getSubTasksByTaskId($parentTaskId: Int!) {
    allSubTasks(condition: { isDeleted: false, parentTaskId: $parentTaskId }) {
      nodes {
        title
        statusId
        subTaskId
      }
    }
  }
`;

export type RowSubTask = {
  statusId: number;
  title: string;
  subTaskId: number;
};

export type RowSubTasks = {
  allSubTasks: {
    nodes: RowSubTask[];
  };
};

export const useSubTasksByTaskId = (parentTaskId: number) => {
  const {
    data: rawData,
    error: subTasksError,
    loading: subTasksLoading,
  } = useQuery<RowSubTasks>(GET_SUB_TASKS_BY_TASK_ID, {
    variables: { parentTaskId },
  });

  return {
    data: rawData?.allSubTasks.nodes.map(({ subTaskId, statusId, title }) => ({
      subTaskId,
      statusId,
      title,
    })),
    subTasksError,
    subTasksLoading,
  };
};
