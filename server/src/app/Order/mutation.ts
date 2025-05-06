export const mutation=`#graphql
    CreatePayURL(payload:CreatePayURLPayload):String
    CaptureOrder(payload:CapturePaymentPayload,orderId:String):Boolean
`