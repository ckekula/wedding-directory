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
    createVisitor(createVisitorInput: { email: $email, password: $password }) {
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
      about
      phone
      city
      location
      email
      password
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

export const CREATE_GUESTLIST = gql`
  mutation CreateGuestList($input: CreateGuestListInput!) {
    createGuestList(input: $input) {
      id
      name
      number
      address
      contact
      email
      status
      visitor {
        id
      }
    }
  }
`;

export const UPDATE_GUESTLIST = gql`
  mutation UpdateGuestList($id: String!, $input: UpdateGuestListInput!) {
    updateGuestList(id: $id, input: $input) {
      number
      address
      contact
      email
      status
    }
  }
`;

export const DELETE_GUESTLIST = gql`
  mutation DELETE_GUESTLIST($id: String!) {
    deleteGuestList(id: $id)
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

export const UPDATE_BUDGET_ITEM = gql`
  mutation UpdateBudgetItem(
    $id: String!
    $updateBudgetItemInput: UpdateBudgetItemInput!
  ) {
    updateBudgetItem(id: $id, updateBudgetItemInput: $updateBudgetItemInput) {
      itemName
      estimatedCost
      amountPaid
      isPaidInFull
      updatedAt
    }
  }
`;

export const CREATE_BUDGET_TOOL = gql`
  mutation CreateBudgetTool($input: CreateBudgetToolInput!) {
    createBudgetTool(createBudgetToolInput: $input) {
      id
    }
  }
`;

export const CREATE_BUDGET_ITEM = gql`
  mutation CreateBudgetItem($input: CreateBudgetItemInput!) {
    createBudgetItem(createBudgetItemInput: $input) {
      id
    }
  }
`;

export const DELETE_BUDGET_ITEM = gql`
  mutation DeleteBudgetItem($id: String!) {
    deleteBudgetItem(id: $id)
  }
`;

export const ADD_TO_MY_VENDORS = gql`
  mutation AddToMyVendors($visitorId: String!, $offeringId: String!) {
    addToMyVendors(visitorId: $visitorId, offeringId: $offeringId) {
      id
      offering {
        id
        name
      }
    }
  }
`;

export const REMOVE_FROM_MY_VENDORS = gql`
  mutation RemoveFromMyVendors($visitorId: String!, $offeringId: String!) {
    removeFromMyVendors(visitorId: $visitorId, offeringId: $offeringId) {
      id
      offering {
        id
        name
      }
    }
  }
`;
export const CREATE_CHAT = gql`
  mutation CreateChat($visitorId: String!, $offeringId: String!) {
    createChat(
      createChatInput: { visitorId: $visitorId, offeringId: $offeringId }
    ) {
      chatId
      visitorId
      offeringId
      vendorId
      visitor {
        id
      }
      vendor {
        id
      }
      offering {
        id
      }
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation sendQuoteMessage(
    $chatId: String!
    $content: String!
    $visitorSenderId: String
    $vendorSenderId: String
  ) {
    sendQuoteMessage(
      chatId: $chatId
      content: $content
      visitorSenderId: $visitorSenderId
      vendorSenderId: $vendorSenderId
    ) {
      chatId
      messages {
        content
        senderId
        senderType
        timestamp
      }
    }
  }
`;

export const CREATE_PACKAGE = gql`
  mutation CreatePackage($input: CreatePackageInput!, $offeringId: String!) {
    createPackage(input: $input, offeringId: $offeringId) {
      id
      name
      description
      pricing
      features
      visible
    }
  }
`;

export const UPDATE_PACKAGE = gql`
  mutation UpdatePackage($input: UpdatePackageInput!) {
    updatePackage(input: $input) {
      id
      name
      description
      pricing
      features
      visible
    }
  }
`;

export const DELETE_PACKAGE = gql`
  mutation DeletePackage($id: String!) {
    deletePackage(id: $id)
  }
`;

export const CREATE_REVIEW = gql`
  mutation CreateReview($input: CreateReviewInput!) {
    createReview(input: $input) {
      id
      comment
      rating
      offering {
        id
      }
      visitor {
        id
      }
    }
  }
`;

export const SET_WEDDING_DATE = gql`
  mutation SetWeddingDate($visitorId: String!, $weddingDate: DateTime!) {
    setWeddingDate(visitorId: $visitorId, weddingDate: $weddingDate) {
      id
      wed_date
    }
  }
`;
