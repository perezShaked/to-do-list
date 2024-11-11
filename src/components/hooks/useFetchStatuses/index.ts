import { useQuery } from '@apollo/client';
import { GET_ALL_STATUSES } from '../../../services';
import { Statuses } from '../../../types';

export const useFetchStatuses = () => {
  const { data } = useQuery(GET_ALL_STATUSES);

  const statuses: Statuses = {};

  if (data) {
    data.allStatuses.nodes.forEach((element: any) => {
      statuses[element.englishName] = { hebrew_name: element.hebrewName, color: element.color };
    });
    return statuses;
  }
};
