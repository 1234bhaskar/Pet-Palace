import { useMutation } from "@tanstack/react-query"
import { graphqlClient } from "../GraphqlClient/api"
import toast from "react-hot-toast"
import { CreatingOrderData } from "../gql/graphql"
import { createOrderMutation } from "../graphql/mutation/order"

export const useCreateOrder=()=>{
    // const quertClient=useQueryClient();

    const mutation=useMutation({
        mutationFn:(payload:CreatingOrderData)=> 
            graphqlClient.request(createOrderMutation,{payload}),

        onMutate:()=> toast.loading("Ordering Product",{id:'1'}),

        onSuccess:async()=>{
            // ! have to write invalidate query
            toast.success("Ordered Product",{id:'1'})
        },
        
        onError:()=> toast.error("Something went wrong, Please try again later.",{id:"1"})
    })
    return mutation
}