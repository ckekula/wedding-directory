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

export const FIND_PACKAGE_BY_ID = gql`
  query FindPackageById($id: String!) {
    findPackageById(id: $id) {
      id
      name
      category
      about
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
      }
    }
  }
`;

export const FIND_PACKAGES_BY_VENDOR = gql`
  query FindPackagesByVendor($id: String!) {
    findPackagesByVendor(id: $id) {
      id
      name
      category
      about
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

export const GET_PACKAGE_BY_ID = gql`
  query GetPackageById($id: String!) {
    findPackageById(id: $id) {
      id
      category
      start_price
      experience
      vendor {
        id
        busname
        city
      }
    }
  }
`;