import { gql } from "@apollo/client";

export const CREATE_VENDOR = gql`
  mutation CreateVendor($input: CreateVendorInput!) {
    createVendor(input: $input) {
      id
      email
      fname
      lname
      busname
      phone
      category
    }
  }
`;

export const UPDATE_VISITOR = gql`
    mutation UpdateVisitor($id: String!, $input: UpdateVisitorInput!) {
        updateVisitor(id: $id, input: $input) {
            id
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
