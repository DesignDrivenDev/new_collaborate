import { gql } from "graphql-request";

export const testimonialsGql = gql`
  query testimonials {
    testmonials(first: 100) {
      name
      designation
      review
      profile {
        url
      }
    }
  }
`;
