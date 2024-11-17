import { gql, useQuery } from '@apollo/client';

export const GET_ALL_TASKS = gql`
  query allTasks {
    allTasks(condition: { isDeleted: false }) {
      edges {
        node {
          taskId
          title
          dueDate
          madeBy
          owner
          statusId
          subTasksByParentTaskId(condition: { isDeleted: false }) {
            nodes {
              parentTaskId
              statusId
              subTaskId
              title
            }
          }
        }
      }
    }
  }
`;

export type RawSubTask = {
  parentTaskId: number;
  statusId: number;
  subTaskId: number;
  title: string;
};

export type RawSubTasks = {
  nodes: RawSubTask[];
};

export type RowTask = {
  taskId: number;
  dueDate: string;
  madeBy: string;
  owner: string;
  statusId: number;
  title: string;
  subTasksByParentTaskId: RawSubTasks;
};

export type RawTasks = {
  allTasks: {
    edges: {
      node: RowTask;
    }[];
  };
};

export const useTasksQuery = () => {
  const {
    data: rawData,
    error: tasksError,
    loading: tasksLoading,
    refetch: tasksRefetch,
  } = useQuery<RawTasks>(GET_ALL_TASKS);

  return {
    data: rawData?.allTasks.edges.map(({ node }) => ({
      ...node,
      subTasks: node.subTasksByParentTaskId.nodes,
    })),
    tasksError,
    tasksLoading,
    tasksRefetch,
  };
};
