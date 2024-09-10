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
    categories
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
    

    export const getProductsBySearchQuery=graphql(`
      #graphql
    query GetProductsBySearch($searchTerm: String) {
    getProductsBySearch(searchTerm: $searchTerm) {
    name
    description
    categories
    id
    price
    images
  }
}
      `)