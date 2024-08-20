import {graphql} from "../../gql"

export const createProductMuation=graphql(`
    #graphql
    mutation CreateProduct($payload: CreatingProductData!) {
        createProduct(payload: $payload)
    }
`)