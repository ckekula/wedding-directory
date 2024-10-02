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

export const FIND_VENDORS_WITH_FILTERS = gql`
  query FindVendorsWithFilters($filters: VendorFilterInput!) {
    findVendorsWithFilters(filters: $filters) {
      id
      name
      city
      banner
    }
  }
`;