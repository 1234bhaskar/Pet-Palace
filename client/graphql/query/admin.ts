import { graphql } from "../../gql";

export const getAllOrdersQuery =graphql(`#graphql
query GetAllOrder {
 getAllOrder {
            User {
                firstName
                lastName
                email
            }
            Product {
                name
            }
            total
            quantity
            createdAt
            id
}
}
    `
)

export const getAllSellersQuery=graphql(`#graphql
    query GetAllSellers {
    getAllSellers {
        firstName
        lastName
        profileImageURL
        createdAt
    }
    }
`)