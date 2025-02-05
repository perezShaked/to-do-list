import { useQuery, gql } from '@apollo/client';
import { Statuses } from '../../types';

export const GET_ALL_STATUSES = gql`
  query getAllStatuses {
    allStatuses {
      nodes {
        id
        hebrewName
        color
      }
    }
  }
`;

export type RawStatus = {
  id: number;
  hebrewName: string;
  color: string;
};

export type RawStatuses = {
  allStatuses: {
    nodes: RawStatus[];
  };
};

export const useStatusesQuery = () => {
  const {
    data: rawData,
    error: statusesError,
    loading: statusesLoading,
  } = useQuery<RawStatuses>(GET_ALL_STATUSES);

  return {
    data: rawData?.allStatuses.nodes.reduce((statuses, { id, hebrewName, color }) => {
      statuses[id] = {
        hebrew_name: hebrewName,
        color,
      };
      return statuses;
    }, {} as Statuses),
    statusesError,
    statusesLoading,
  };
};
