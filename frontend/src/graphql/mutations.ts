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
      city
      location
    }
  }
`;

export const CREATE_VISITOR_MUTATION = gql`
    mutation CreateVisitor($email: String!, $password: String!) {
        createVisitor(createVisitorInput: {
            email: $email,
            password: $password
        }) {
            id
            email
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

export const CREATE_SERVICE = gql`
  mutation CreateOffering($input: CreateOfferingInput!) {
    createOffering(input: $input) {
      id
      name
      category
      vendor {
        id
      }
    }
  }
`;

export const UPDATE_VENDOR = gql`
  mutation UpdateVendor($id: String!, $input: UpdateVendorInput!) {
    updateVendor(id: $id, input: $input) {
      fname
      lname
      busname 
      phone 
      city 
      location
    }
  }
`;

export const UPDATE_SERVICE_PROFILE = gql`
  mutation UpdateOffering($id: String!, $input: UpdateOfferingInput!) {
    updateOffering(id: $id, input: $input) {
      category
      bus_phone
      bus_email
      description 
      pricing
    }
  }
`;

export const UPDATE_SERVICE_SOCIALS = gql`
  mutation UpdateOffering($id: String!, $input: UpdateOfferingInput!) {
    updateOffering(id: $id, input: $input) {
      facebook
      instagram
      tiktok
      x
    }
  }
`;




export const CREATE_CHECKLIST = gql`
  mutation CreateChecklist($input: CreateChecklistInput!) {
    createChecklist(input: $input) {
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

export const UPDATE_CHECKLIST = gql`
  mutation UpdateChecklist($input: UpdateChecklistInput!) {
    updateChecklist(input: $input) {
      id
      title
      due_date
      category
      completed
      notes
      updatedAt
    }
  }
`;

export const DELETE_CHECKLIST = gql`
  mutation DeleteChecklist($id: String!) {
    deleteChecklist(id: $id)
  }
`;
