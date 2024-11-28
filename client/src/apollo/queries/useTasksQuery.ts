import { gql, useQuery } from '@apollo/client';

export const GET_ALL_TASKS = gql`
  query allTasks {
    allTasks(condition: { isDeleted: false }) {
      nodes {
        id
        title
        dueDate
        madeBy
        owner
        statusId
        subTasksByParentTaskId(condition: { isDeleted: false }) {
          nodes {
            statusId
            id
            title
          }
        }
      }
    }
  }
`;

export type RawSubTask = {
  statusId: number;
  id: number;
  title: string;
};

export type RawSubTasks = {
  nodes: RawSubTask[];
};

export type RawTask = {
  id: number;
  dueDate: string;
  madeBy: string;
  owner: string;
  statusId: number;
  title: string;
  subTasksByParentTaskId: RawSubTasks;
};

export type RawTasks = {
  allTasks: {
      nodes: RawTask[];
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
    data: rawData?.allTasks.nodes.map((task) => ({
      ...task,
      subTasks: task.subTasksByParentTaskId.nodes,
    })),
    tasksError,
    tasksLoading,
    tasksRefetch,
  };
};
