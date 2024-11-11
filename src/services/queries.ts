import { gql } from '@apollo/client';

export const GET_ALL_STATUSES = gql`
  query getAllStatuses {
    allStatuses {
      nodes {
        englishName
        hebrewName
        color
        id
      }
    }
  }
`;
