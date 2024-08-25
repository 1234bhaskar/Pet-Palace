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


export const getProductByIdQuery= graphql(`
  #graphql
  query GetProuctById($getProuctByIdId: String!) {
  getProuctById(id: $getProuctByIdId) {
    id
    images
    name
    price
    stock
    description
    categories
  }
}
  `)
    