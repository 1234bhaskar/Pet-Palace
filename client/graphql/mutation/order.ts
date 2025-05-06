import {graphql} from "../../gql";

export const createPayURLMutation=graphql(`
    #graphql
    mutation CreatePayURL($payload: CreatePayURLPayload) {
        CreatePayURL(payload: $payload)
    }
`)
export const CaptureOrderMutation=graphql(`
    #graphql
    mutation CaptureOrder($payload: CapturePaymentPayload, $orderId: String) {
        CaptureOrder(payload: $payload, orderId: $orderId)
    }   
`)