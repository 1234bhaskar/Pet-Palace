 import { graphql } from "../../gql";

export const getAllProductQuery = graphql(`
    #graphql
     query GetAllProduct {
     getAllProduct {
    id
    name
    price
    description
    images
    seller {
      firstName
      lastName
    }
  }
}  
    `)

    