import { gql } from "graphql-request";

export const jobsHomeGql = gql`
  query JobLists {
    jobLists(first: 5) {
      title
      slug
      location
    }
  }
`;

export const indiaJobsGql = gql`
  query JobLists {
    jobLists(where: { country: INDIA }) {
      title
      slug
      experience
      salary
      location
      jobDetails {
        raw
      }
      lca {
        raw
      }
    }
  }
`;
export const usaJobsGql = gql`
  query JobLists {
    jobLists(where: { country: USA }) {
      title
      slug
      experience
      salary
      location
      jobDetails {
        raw
      }
      lca {
        raw
      }
    }
  }
`;

export const jobDetailsGql = gql`
  query JobLists($slug: String) {
    jobLists(where: { slug: $slug }) {
      title
      slug
      experience
      salary
      location
      jobDetails {
        raw
      }
      lca {
        raw
      }
    }
  }
`;

export const jobApplicationGql = gql`
  mutation CreateJobApplication(
    $jobTitle: String
    $fullName: String
    $email: String
    $phone: String
    $description: String
    $cvId: ID
  ) {
    createJobApplication(
      data: {
        jobTitle: $jobTitle
        fullName: $fullName
        email: $email
        phone: $phone
        description: $description
        cv: { connect: { id: $cvId } }
      }
    ) {
      id
      fullName
      email
      phone
      cv {
        url
      }
    }
  }
`;

export const lcaUSAJobsGql = gql`
  query JobLists {
    jobLists(where: { country: USA }) {
      title
      lca {
        raw
      }
    }
  }
`;
