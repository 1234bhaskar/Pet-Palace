import {useQuery} from "@tanstack/react-query";
import { graphqlClient } from "../GraphqlClient/api";
import { getAllCategories, getCurrentUserQuery } from "../graphql/query/user";

export const useGetCurrentUser=()=>{
    const query=useQuery({
        queryKey:["current_user"],
        queryFn:()=>graphqlClient.request(getCurrentUserQuery)
    });
    return{...query,user:query.data?.getCurrentUser}
}
export const useGetAllCategory=()=>{
    const query=useQuery({
        queryKey:["all_category"],
        queryFn:()=>graphqlClient.request(getAllCategories)
    });
    return{...query,categories:query.data?.getAllCategories}
}