import { gql, useQuery } from '@apollo/client';

export const GET_ALL_TASKS = gql`
  query getAllTasks {
    allTasks(condition: { isDeleted: false }) {
      nodes {
        taskId
        dueDate
        madeBy
        owner
        statusId
        title
      }
    }
  }
`;

export type RowTask = {
  taskId: number;
  dueDate: string;
  madeBy: string;
  owner: string;
  statusId: number;
  title: string;
};

export type RawTasks = {
  allTasks: {
    nodes: RowTask[];
  };
};

export const useTasksQuery = () => {
  const {
    data: rawData,
    error: tasksError,
    loading: tasksLoading,
  } = useQuery<RawTasks>(GET_ALL_TASKS);

  return {
    data: rawData?.allTasks.nodes.map(({ taskId, dueDate, madeBy, owner, statusId, title }) => ({
      taskId,
      dueDate,
      madeBy,
      owner,
      statusId,
      title,
    })),
    tasksError,
    tasksLoading,
  };
};
