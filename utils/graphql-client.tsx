import { GraphQLClient } from "graphql-request"

export const queryClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_HIGH_PERFORMANCE_HYGRAPH_URL as string,
  {
    cache: "no-store",
  }
)

export const mutationClient = new GraphQLClient(
  process.env.NEXT_PUBLIC_HYGRAPH_URL as string,
  {
    cache: "no-store",
  }
)
