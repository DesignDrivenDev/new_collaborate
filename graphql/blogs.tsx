// // import { gql } from "graphql-request"

// // export const blogsNameGql = gql`
// //   query Blogs {
// //     blogs(first: 100) {
// //       slug
// //     }
// //   }
// // `

// // export const blogsHomeGql = gql`
// //   query Blogs {
// //     blogs(first: 100) {
// //       title
// //       slug
// //       shortDescription
// //       image {
// //         url
// //       }
// //     }
// //   }
// // `

// // export const blogsFullGql = gql`
// //   query BlogsConnection($skip: Int, $first: Int) {
// //     blogsConnection(first: $first, skip: $skip) {
// //       pageInfo {
// //         hasNextPage
// //       }
// //       edges {
// //         node {
// //           title
// //           slug
// //           shortDescription
// //           image {
// //             url
// //           }
// //           blurHash
// //           blogCategories {
// //             category
// //             slug
// //           }
// //           content {
// //             raw
// //             text
// //           }
// //         }
// //       }
// //     }
// //   }
// // `

// // export const blogCategoriesGql = gql`
// //   query BlogCategories {
// //     blogCategories(first: 100) {
// //       category
// //       slug
// //     }
// //   }
// // `

// // export const blogsByCategoryGql = gql`
// //   query BlogsConnection($skip: Int, $first: Int, $slug: String) {
// //     blogsConnection(
// //       first: $first
// //       skip: $skip
// //       where: { blogCategories_some: { slug: $slug } }
// //     ) {
// //       pageInfo {
// //         hasNextPage
// //       }
// //       edges {
// //         node {
// //           title
// //           slug
// //           shortDescription
// //           image {
// //             url
// //           }
// //           blurHash
// //           blogCategories {
// //             category
// //             slug
// //           }
// //           content {
// //             raw
// //             text
// //           }
// //         }
// //       }
// //     }
// //   }
// // `

// // export const blogDetailsGql = gql`
// //   query Blogs($slug: String) {
// //     blogs(where: { slug: $slug }) {
// //       title
// //       slug
// //       shortDescription
// //       image {
// //         url
// //       }
// //       blurHash
// //       blogCategories {
// //         category
// //         slug
// //       }
// //       content {
// //         text
// //         raw
// //       }
// //     }
// //   }
// // `

// // export const relatedBlogsGql = gql`
// //   query Blogs($slug: String) {
// //     blogs(first: 3, where: { slug_not: $slug }) {
// //       title
// //       slug
// //       shortDescription
// //       image {
// //         url
// //       }
// //       blurHash
// //       blogCategories {
// //         category
// //         slug
// //       }
// //       content {
// //         text
// //         raw
// //       }
// //     }
// //   }
// // `

// // new query

// import { gql } from "graphql-request";

// export const blogsNameGql = gql`
//   query Blogs {
//     blogs(first: 100) {
//       slug
//     }
//   }
// `;

// export const blogsHomeGql = gql`
//   query Blogs {
//     blogs(first: 100) {
//       title
//       slug
//       shortDescription
//       image {
//         url
//       }
//     }
//   }
// `;

// export const blogsFullGql = gql`
//   query BlogsConnection($skip: Int, $first: Int) {
//     blogsConnection(first: $first, skip: $skip) {
//       pageInfo {
//         hasNextPage
//       }
//       edges {
//         node {
//           title
//           slug
//           shortDescription
//           image {
//             url
//           }
//           blurHash
//           content {
//             raw
//             text
//           }
//         }
//       }
//     }
//   }
// `;

// export const blogDetailsGql = gql`
//   query Blogs($slug: String) {
//     blogs(where: { slug: $slug }) {
//       title
//       slug
//       shortDescription
//       image {
//         url
//       }
//       blurHash
//       content {
//         text
//         raw
//       }
//     }
//   }
// `;

// export const relatedBlogsGql = gql`
//   query Blogs($slug: String) {
//     blogs(first: 3, where: { slug_not: $slug }) {
//       title
//       slug
//       shortDescription
//       image {
//         url
//       }
//       blurHash
//       content {
//         text
//         raw
//       }
//     }
//   }
// `;

// new query

import { gql } from "graphql-request";

export const blogsNameGql = gql`
  query Blogs {
    blogs(first: 100) {
      slug
    }
  }
`;

export const blogsHomeGql = gql`
  query Blogs {
    blogs(first: 100) {
      title
      slug
      shortDescription
      image {
        url
      }
    }
  }
`;

export const blogsFullGql = gql`
  query BlogsConnection($skip: Int, $first: Int) {
    blogsConnection(first: $first, skip: $skip) {
      pageInfo {
        hasNextPage
      }
      edges {
        node {
          title
          slug
          shortDescription
          image {
            url
          }
          blurHash
          content {
            raw
            text
          }
        }
      }
    }
  }
`;

export const blogDetailsGql = gql`
  query Blogs($slug: String) {
    blogs(where: { slug: $slug }) {
      title
      slug
      shortDescription
      image {
        url
      }
      blurHash
      content {
        text
        raw
      }
    }
  }
`;

export const relatedBlogsGql = gql`
  query Blogs($slug: String) {
    blogs(first: 3, where: { slug_not: $slug }) {
      title
      slug
      shortDescription
      image {
        url
      }
      blurHash
      content {
        text
        raw
      }
    }
  }
`;
