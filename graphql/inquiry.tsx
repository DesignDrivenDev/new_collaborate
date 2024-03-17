import { gql } from "graphql-request"

// { connect: [{ slug: "databricks" }, { slug: "sap" }] }

export const addInquiryGql = gql`
  mutation AddInquiry(
    $name: String!
    $email: String!
    $mobileNumber: String!
    $companyName: String!
    $location: String!
    $services: ServiceCreateManyInlineInput!
  ) {
    createInquiry(
      data: {
        name: $name
        email: $email
        mobileNumber: $mobileNumber
        companyName: $companyName
        location: $location
        services: $services
      }
    ) {
      id
    }
  }
`
