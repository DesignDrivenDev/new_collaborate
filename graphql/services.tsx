// import { gql } from "graphql-request"

// export const servicesNameGql = gql`
//   query Services {
//     services(first: 100) {
//       title
//       slug
//     }
//   }
// `

// export const servicesHomeGql = gql`
//   query Services {
//     services(first: 10) {
//       title
//       slug
//       image {
//         url
//       }
//       overview
//       overviewImage {
//         url
//       }
//     }
//   }
// `

// export const servicesFullGql = gql`
//   query Services {
//     services {
//       title
//       slug
//       image {
//         url
//       }
//       overview
//       whyWeNeed
//       needImage {
//         url
//       }
//       howWeCanHelp
//       howCanWeHelpImage {
//         url
//       }
//       outcome
//       outcomeImage {
//         url
//       }
//     }
//   }
// `

// export const serviceDetailsGql = gql`
//   query Services($slug: String) {
//     services(where: { slug: $slug }) {
//       title
//       slug
//       image {
//         url
//       }
//       overview
//       whyWeNeed
//       needImage {
//         url
//       }
//       howWeCanHelp
//       howCanWeHelpImage {
//         url
//       }
//       outcome
//       outcomeImage {
//         url
//       }
//     }
//   }
// `

// new query

import { gql } from "graphql-request";

export const servicesNameGql = gql`
  query Services {
    services(first: 100) {
      title
      slug
    }
  }
`;

export const servicesHomeGql = gql`
  query Services {
    services(first: 10) {
      title
      slug
      image {
        url
      }
      overview
      overviewImage {
        url
      }
    }
  }
`;

export const servicesAllGql = gql`
  query ServicesConnection($skip: Int, $first: Int) {
    servicesConnection(first: $first, skip: $skip) {
      pageInfo {
        hasNextPage
        hasNextPage
      }
      edges {
        node {
          title
          slug
          image {
            url
          }
          overview
          whyWeNeed
          needImage {
            url
          }
          howWeCanHelp
          howCanWeHelpImage {
            url
          }
          outcome
          outcomeImage {
            url
          }
        }
      }
    }
  }
`;

export const servicesFullGql = gql`
  query Services {
    services {
      title
      slug
      image {
        url
      }
      overview
      whyWeNeed
      needImage {
        url
      }
      howWeCanHelp
      howCanWeHelpImage {
        url
      }
      outcome
      outcomeImage {
        url
      }
    }
  }
`;

export const serviceDetailsGql = gql`
  query Services($slug: String) {
    services(where: { slug: $slug }) {
      title
      slug
      image {
        url
      }
      overview
      whyWeNeed
      needImage {
        url
      }
      howWeCanHelp
      howCanWeHelpImage {
        url
      }
      outcome
      outcomeImage {
        url
      }
      cta
    }
  }
`;
