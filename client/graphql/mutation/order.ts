import {graphql} from "../../gql";

export const createOrderMutation=graphql(`
    #graphql
    mutation CreateOrder($payload: CreatingOrderData) {
        CreateOrder(payload: $payload)
    }
`)