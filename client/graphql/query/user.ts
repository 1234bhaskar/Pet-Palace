import { graphql } from "../../gql";

export const verifyGoogleTokenQuery=graphql(`
    #graphql
    query VerifyGoogleToken($token: String!,$role: String) {
        verifyGoogleToken(token: $token,role: $role)
    }
`)

export const getCurrentUserQuery=graphql(`
    #graphql
    query GetCurrentUser {
        getCurrentUser {
            id
            lastName
            firstName
            profileImageURL
        }
    }      
`)