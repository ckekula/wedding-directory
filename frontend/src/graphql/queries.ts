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
    query GetFilteredOfferings($filter: OfferingFilterInput) {
        findOfferings(filter: $filter) {
            id
            name
            category
            visible
            bus_phone
            bus_email
            description
            banner
            reviews {
                rating
            }
            vendor {
                id
                busname
                city
                phone
            }
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
      banner
      visible
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

export const DELETE_SHOWCASE_IMAGE = gql`
  mutation DeletePhotoShowcase($id: String!, $index: Int!) {
    deleteOfferingShowcaseImage(id: $id, index: $index)
  }
`;

export const DELETE_BANNER_IMAGE = gql`
  mutation DeleteBannerImage($id: String!) {
    deleteOfferingBanner(id: $id)
  }
`;

export const DELETE_SHOWCASE_VIDEO = gql`
  mutation DeleteVideoShowcase($id: String!) {  
    deleteOfferingVideo(id: $id)
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
      reviews{
        rating
      }
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
      fname
      lname
      busname
      about
      phone
      city
      location
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
      budgetItems {
        id
        itemName
        estimatedCost
        amountPaid
        category
        specialNotes
        isPaidInFull
      }
    }
    visitorPayments(visitorId: $visitorId) {
      id
      amount
      createdAt
      status
      package {
        name
        pricing
        offering {
          name
          category
        }
      }
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
      visible
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
      visitor {
        visitor_fname
      }
    }
  }
`;

export const GET_CHAT = gql`
  query GetChat($visitorId: String!, $offeringId: String!) {
    getChat(visitorId: $visitorId, offeringId: $offeringId) {
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
      messages {
        id
        content
        senderId
        senderType
        timestamp
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
      offeringId
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
      offeringId
      messages {
        content
        senderId
        senderType
        timestamp
      }
    }
  }
`;

export const GET_OFFERING_DETAILS = gql`
  query GetOfferingDetails($id: String!) {
    findOfferingById(id: $id) {
      id
      name
      category
      vendor {
        id
        busname
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


export const GET_VENDOR_PAYMENTS = gql`
  query GetVendorPayments($vendorId: String!) {
    vendorPayments(vendorId: $vendorId) {
      id
      amount
      status
      createdAt
      visitor {
        id
        visitor_fname
        email
      }
      package {
        id
        name
        offering{
          id
          name
        }
      }
    }
  }
`;

export const GET_VISITOR_PAYMENTS = gql`
  query GetVisitorPayments($visitorId: String!) {
    visitorPayments(visitorId: $visitorId) {
      id
      amount
      status
      createdAt
      package {
        name
        offering{
          id
          name
        }
      }
    }
  }
`;