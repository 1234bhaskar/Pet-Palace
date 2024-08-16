import { graphql } from "../../gql";

export const verifyGoogleTokenQuery=graphql(`
    #graphql
    query VerifyGoogleToken($token: String!) {
        verifyGoogleToken(token: $token)
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