import { useMutation } from "@tanstack/react-query"
import { graphqlClient } from "../GraphqlClient/api"
import toast from "react-hot-toast"
import { CapturePaymentPayload, CreatePayUrlPayload } from "../gql/graphql"
import { CaptureOrderMutation, createPayURLMutation } from "../graphql/mutation/order"

export const useCreateOrder=()=>{
    // const quertClient=useQueryClient();

    const mutation=useMutation({
        mutationFn:(payload:CreatePayUrlPayload)=> 
            graphqlClient.request(createPayURLMutation,{payload}),

        onMutate:()=> toast.loading("Ordering Product",{id:'1'}),

        
        onError:()=> toast.error("Something went wrong, Please try again later.",{id:"1"})
    })
    return mutation
}
export const useCaptureOrder=()=>{
    // const quertClient=useQueryClient();

    const mutation=useMutation({
        mutationFn:(payload:CapturePaymentPayload)=> 
            graphqlClient.request(CaptureOrderMutation,{payload}),

        onSuccess:async()=>{
            // ! have to write invalidate query
            toast.success("Ordered Product",{id:"1"})
        },
        
        onError:()=> toast.error("Something went wrong, Please try again later.",{id:"1"})
    })
    return mutation
}