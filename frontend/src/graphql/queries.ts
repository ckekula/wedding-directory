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
  query FindOfferings($filter: OfferingFilterInput) {
    findOfferings(filter: $filter) {
      id
      name
      vendor {
        id
        busname
        city
      }
      category
      description
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
      banner
      photo_showcase
      video_showcase
      vendor {
        id
        busname
        city
        about
      }
    }
  }
`;

export const FIND_PORTFOLIO_BY_ID = gql`
  query FindOfferingById($id: String!) {
    findOfferingById(id: $id) {
      id
      banner
      photo_showcase
      video_showcase
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
      profile_pic_url
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


export const GET_VISITOR_CHECKLISTS = gql`
  query GetVisitorChecklists($visitorId: String!) {
    getVisitorChecklists(visitorId: $visitorId) {
      id
      title
      due_date
      category
      completed
      notes
      createdAt
      updatedAt
    }
  }
`;
