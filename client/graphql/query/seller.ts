import { graphql } from "../../gql";

export const getSignedURLForProductQuery=graphql(`
    #graphql
    query GetSignedURLForProduct($imageName: String!, $imageType: String!) {
        getSignedURLForProduct(imageName: $imageName, imageType: $imageType)
    }     
`)