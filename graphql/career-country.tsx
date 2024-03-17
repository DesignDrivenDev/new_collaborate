import { gql } from "graphql-request";

export const countriesNameGql = gql`
  query CareerCountries {
    careerCountries(orderBy: title_ASC) {
      title
      slug
    }
  }
`;
