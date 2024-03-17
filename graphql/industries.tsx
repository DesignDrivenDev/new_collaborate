// import { gql } from "graphql-request"

// export const industriesNameGql = gql`
//   query MyQuery {
//     industries(first: 100) {
//       title
//       slug
//     }
//   }
// `

// export const industriesAboutGql = gql`
//   query Industries {
//     industries(first: 8) {
//       title
//       slug
//       image {
//         url
//       }
//       overview
//     }
//   }
// `

// export const industriesFullGql = gql`
//   query Industries {
//     industries {
//       title
//       slug
//       image {
//         url
//       }
//       overview
//       growthAndFuture {
//         raw
//       }
//       challenges {
//         raw
//       }
//       howCollaborateSolutionsCanHelp {
//         raw
//       }
//       blogsAndResources
//       overviewImage {
//         url
//       }
//       growthAndFutureImage {
//         url
//       }
//       challengesImage {
//         url
//       }
//       howCollaborateSolutionsCanHelpImage {
//         url
//       }
//     }
//   }
// `

// export const industryDetailsGql = gql`
//   query Industries($slug: String) {
//     industries(where: { slug: $slug }) {
//       title
//       slug
//       image {
//         url
//       }
//       overview
//       growthAndFuture {
//         raw
//       }
//       challenges {
//         raw
//       }
//       howCollaborateSolutionsCanHelp {
//         raw
//       }
//       blogsAndResources
//       overviewImage {
//         url
//       }
//       growthAndFutureImage {
//         url
//       }
//       challengesImage {
//         url
//       }
//       howCollaborateSolutionsCanHelpImage {
//         url
//       }
//     }
//   }
// `
// new query

import { gql } from "graphql-request";

export const industriesNameGql = gql`
  query MyQuery {
    industries(first: 100) {
      title
      slug
    }
  }
`;

export const industriesAboutGql = gql`
  query Industries {
    industries(first: 8) {
      title
      slug
      image {
        url
      }
      overview
    }
  }
`;

export const industriesFullGql = gql`
  query Industries {
    industries {
      title
      slug
      image {
        url
      }
      overview
      growthAndFuture {
        raw
      }
      challenges {
        raw
      }
      howCollaborateSolutionsCanHelp {
        raw
      }
      blogsAndResources
      overviewImage {
        url
      }
      growthAndFutureImage {
        url
      }
      challengesImage {
        url
      }
      howCollaborateSolutionsCanHelpImage {
        url
      }
    }
  }
`;

export const industryDetailsGql = gql`
  query Industries($slug: String) {
    industries(where: { slug: $slug }) {
      title
      slug
      image {
        url
      }
      overview
      growthAndFuture {
        raw
      }
      challenges {
        raw
      }
      howCollaborateSolutionsCanHelp {
        raw
      }
      blogsAndResources
      overviewImage {
        url
      }
      growthAndFutureImage {
        url
      }
      challengesImage {
        url
      }
      howCollaborateSolutionsCanHelpImage {
        url
      }
    }
  }
`;
