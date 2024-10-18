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

export const FIND_SERVICES = gql`
  query FindOfferings($filter: PackageOfferingInput!) {
    findOfferings(filter: $filter) {
      id
      name
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

export const FIND_SERVICE_BY_ID = gql`
  query FindOfferingById($id: String!) {
    findOfferingById(id: $id) {
      id
      name
      category
      description
      bus_phone
      bus_email
      pricing
      banner
      website
      facebook
      instagram
      x
      tiktok
      vendor {
        id
        busname
        city
        about
      }
    }
  }
`;

export const FIND_SERVICES_BY_VENDOR = gql`
  query FindOfferingsByVendor($id: String!) {
    findOfferingsByVendor(id: $id) {
      id
      name
      category
      description
      banner
      vendor {
        id
        busname
        city
      }
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

export const GET_VENDOR_BY_ID = gql`
  query GetVendorById($id: String!) {
    findVendorById(id: $id) {
      id
      email
      password
      fname
      lname 
      location
      busname
      phone
      city
      createdAt
    }
  }
`;