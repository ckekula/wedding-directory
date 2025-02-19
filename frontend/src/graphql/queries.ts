import { gql } from "@apollo/client";

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
      about
      busname
      phone
      city
      createdAt
    }
  }
`;

export const FIND_GUESTLIST_BY_VISITOR = gql`
  query FindGuestListsByVisitor($id: String!) {
    findGuestListsByVisitor(id: $id) {
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

export const GET_BUDGET_TOOL = gql`
  query GetBudgetTool($visitorId: String!) {
    budgetTool(visitorId: $visitorId) {
      id
      totalBudget
      visitor {
        id
        email
      }
      budgetItems {
        id
        itemName
        category
        estimatedCost
        amountPaid
        isPaidInFull
      }
      createdAt
      updatedAt
    }
  }
`;
export const GET_BUDGET_ITEMS = gql`
  query GetBudgetItems($budgetToolId: String!) {
    budgetItems(budgetToolId: $budgetToolId) {
      id
      itemName
      category
      estimatedCost
      amountPaid
      specialNotes
      isPaidInFull
      createdAt
      updatedAt
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

export const FIND_ALL_MY_VENDORS_BY_CATEGORY = gql`
  query FindAllMyVendorsByCategory($visitorId: String!, $category: [String!]) {
    findAllMyVendorsByCategory(visitorId: $visitorId, category: $category) {
      id
      offering {
        id
        name
        category
        vendor {
          busname
          city
        }
        banner
      }
    }
  }
`;

export const FIND_ALL_MY_VENDORS = gql`
  query FindAllMyVendors($visitorId: String!) {
    findAllMyVendors(visitorId: $visitorId) {
      id
      offering {
        id
        name
        category
        vendor {
          busname
          city
        }
        banner
      }
    }
  }
`;

export const FIND_MY_VENDOR_BY_ID = gql`
  query FindMyVendorById($visitorId: String!, $offeringId: String!) {
    findMyVendorById(visitorId: $visitorId, offeringId: $offeringId) {
      id
      offering {
        id
        name
      }
    }
  }
`;

export const FIND_PACKAGES_BY_OFFERING = gql`
  query FindPackagesByOffering($offeringId: String!) {
    findPackagesByOffering(offeringId: $offeringId) {
      id
      name
      description
      pricing
      features
    }
  }
`;

export const FIND_REVIEW_BY_SERVICE = gql`
  query FindReviewsByOffering($offering_id: String!) {
    findReviewsByOffering(offering_id: $offering_id) {
      id
      comment
      rating
      createdAt
      offering {
        id
      }
    }
  }
`;

export const GET_CHAT = gql`
  query GetChat($visitorId: String!, $vendorId: String!) {
    chat(visitorId: $visitorId, vendorId: $vendorId) {
      id
      visitor {
        id
      }
      vendor {
        id
      }
      messages {
        id
        content
        createdAt
        visitorSender {
          id
        }
        vendorSender {
          id
        }
      }
    }
  }
`;

export const GET_CHAT_HISTORY = gql`
  query GetChatHistory($chatId: String!) {
    getChatHistory(chatId: $chatId) {
      messages {
        content
        senderId
        senderType
        timestamp
      }
    }
  }
`;

export const GET_VISITOR_CHATS = gql`
  query GetVisitorChats($visitorId: String!) {
    getVisitorChats(visitorId: $visitorId) {
      chatId
      vendorId
      messages {
        content
        senderId
        senderType
        timestamp
      }
    }
  }
`;

export const GET_VENDOR_DETAILS = gql`
  query GetVendorById($id: String!) {
    findVendorById(id: $id) {
      id
      busname
      city
    }
  }
`;

export const GET_VENDOR_MESSAGES = gql`
  query GetVendorChats($vendorId: String!) {
    getVendorChats(vendorId: $vendorId) {
      chatId
      visitorId
      messages {
        content
        senderId
        senderType
        timestamp
      }
    }
  }
`;

export const GET_VENDOR_CHAT = gql`
  query GetChatHistory($chatId: String!) {
    getChatHistory(chatId: $chatId) {
      messages {
        content
        senderId
        senderType
        timestamp
      }
      visitorId
    }
  }
`;

export const GET_CHAT_VISITOR_DETAILS = gql`
  query FindVisitorById($id: String!) {
    findVisitorById(id: $id) {
      id
      email
      visitor_fname
      partner_fname
    }
  }
`;

export const GET_VENDOR_OFFERING_DETAILS = gql`
  query GetVendorOfferingDetails($vendorId: String!) {
    getVendorOfferingDetails(vendorId: $vendorId) {
      id
      name
      category
      bus_phone
      bus_email
    }
  }
`;
export const FIND_VENDOR_BY_SERVICE = gql`
  query FindVendorsByOffering($offering_id: String!) {
    findVendorsByOffering(offering_id: $offering_id) {
      location
    }
  }
`;
