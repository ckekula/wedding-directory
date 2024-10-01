import { gql } from '@apollo/client';

export const GET_ALL_VISITORS = gql`
  query findAllVisitors {
    findAllVisitors {
      id
      email
      visitor_fname
      visitor_lname
      partner_fname
      partner_lname
      wed_venue
      createdAt
    }
  }
`;

export const AUTOCOMPLETE_QUERY = gql`
    query Autocomplete($input: String!) {
        autocompleteLocation(input: $input)
    }
`;