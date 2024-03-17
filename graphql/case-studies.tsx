// import { gql } from "graphql-request"

// export const caseStudiesNameGql = gql`
//   query CaseStudies {
//     caseStudies(first: 100) {
//       slug
//     }
//   }
// `

// export const caseStudiesHomeGql = gql`
//   query CaseStudies {
//     caseStudies(first: 100) {
//       title
//       slug
//       overview
//       mainImage {
//         url
//       }
//     }
//   }
// `

// export const caseStudiesFullGql = gql`
//   query CaseStudiesConnection($skip: Int, $first: Int) {
//     caseStudiesConnection(first: $first, skip: $skip) {
//       pageInfo {
//         hasNextPage
//       }
//       edges {
//         node {
//           title
//           slug
//           overview
//           mainImage {
//             url
//           }
//           caseStudyCategories {
//             category
//             slug
//           }
//         }
//       }
//     }
//   }
// `

// export const caseStudyCategoriesGql = gql`
//   query CaseStudyCategories {
//     caseStudyCategories(first: 100, orderBy: category_ASC) {
//       category
//       slug
//     }
//   }
// `

// export const caseStudiesByCategoryGql = gql`
//   query CaseStudiesConnection($skip: Int, $first: Int, $slug: String) {
//     caseStudiesConnection(
//       first: $first
//       skip: $skip
//       where: { caseStudyCategories_some: { slug: $slug } }
//     ) {
//       pageInfo {
//         hasNextPage
//       }
//       edges {
//         node {
//           title
//           slug
//           overview
//           mainImage {
//             url
//           }
//           caseStudyCategories {
//             category
//             slug
//           }
//         }
//       }
//     }
//   }
// `

// export const caseStudyDetailsGql = gql`
//   query CaseStudies($slug: String) {
//     caseStudies(where: { slug: $slug }) {
//       title
//       slug
//       overview
//       mainImage {
//         url
//       }
//       caseStudyDetails {
//         raw
//       }
//       caseStudyCategories {
//         category
//         slug
//       }
//     }
//   }
// `

// export const relatedCaseStudiesGql = gql`
//   query CaseStudies {
//     caseStudies(first: 3) {
//       title
//       slug
//       overview
//       mainImage {
//         url
//       }
//     }
//   }
// `

// new query

import { gql } from "graphql-request";

export const caseStudiesNameGql = gql`
  query CaseStudies {
    caseStudies(first: 100) {
      slug
    }
  }
`;

export const caseStudiesHomeGql = gql`
  query CaseStudies {
    caseStudies(first: 100) {
      title
      slug
      overview
      mainImage {
        url
      }
    }
  }
`;

export const caseStudiesFullGql = gql`
  query CaseStudiesConnection($skip: Int, $first: Int) {
    caseStudiesConnection(first: $first, skip: $skip) {
      pageInfo {
        hasNextPage
      }
      edges {
        node {
          title
          slug
          overview
          mainImage {
            url
          }
        }
      }
    }
  }
`;

export const caseStudiesByCategoryGql = gql`
  query CaseStudiesConnection($skip: Int, $first: Int, $slug: String) {
    caseStudiesConnection(
      first: $first
      skip: $skip
      where: { caseStudyCategories_some: { slug: $slug } }
    ) {
      pageInfo {
        hasNextPage
      }
      edges {
        node {
          title
          slug
          overview
          mainImage {
            url
          }
        }
      }
    }
  }
`;

export const caseStudyDetailsGql = gql`
  query CaseStudies($slug: String) {
    caseStudies(where: { slug: $slug }) {
      title
      slug
      overview
      mainImage {
        url
      }
      caseStudyDetails {
        raw
      }
    }
  }
`;

export const relatedCaseStudiesGql = gql`
  query CaseStudies {
    caseStudies(first: 3) {
      title
      slug
      overview
      mainImage {
        url
      }
    }
  }
`;
