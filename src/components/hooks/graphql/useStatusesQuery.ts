import { useQuery, gql } from '@apollo/client';
import { Statuses } from '../../../types';

export const GET_ALL_STATUSES = gql`
  query getAllStatuses {
    allStatuses {
      nodes {
        englishName
        hebrewName
        color
      }
    }
  }
`;

export type RawStatus = {
  englishName: string;
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
    data: rawData?.allStatuses.nodes.reduce((statuses, { englishName, hebrewName, color }) => {
      statuses[englishName] = {
        hebrew_name: hebrewName,
        color,
      };
      return statuses;
    }, {} as Statuses),
    statusesError,
    statusesLoading,
  };
};
