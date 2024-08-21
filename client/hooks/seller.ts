import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CreatingProductData } from "../gql/graphql";
import { graphqlClient } from "../GraphqlClient/api";
import { createProductMuation } from "../graphql/mutation/seller";
import toast from "react-hot-toast";

export const useCreateProduct=()=>{
    // const quertClient=useQueryClient();

    const mutation=useMutation({
        mutationFn:(payload:CreatingProductData)=> 
            graphqlClient.request(createProductMuation,{payload}),

        onMutate:(payload)=> toast.loading("Creating Product",{id:'1'}),

        onSuccess:async()=>{
            // ! have to write invalidate query
            toast.success("Product Created Successfully",{id:'1'})
        },
        
        onError:()=> toast.error("Something went wrong, Please try again later.",{id:"1"})
    })
    return mutation
}