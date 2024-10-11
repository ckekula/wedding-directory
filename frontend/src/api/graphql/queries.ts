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

export const FIND_PACKAGES = gql`
  query FindPackages($filter: PackageFilterInput!) {
    findPackages(filter: $filter) {
      id
      vendor {
        id
        busname
        city
      }
      category
      about
      banner
    }
  }
`;

export const GET_VISITOR_BY_ID = gql`
  query GetVisitorById($id: String!) {
    findVisitorById(id: $id) {
      id
      email
      visitor_fname
      visitor_lname
      partner_fname
      partner_lname
      engaged_date
      wed_date
      wed_venue
    }
  }
`;