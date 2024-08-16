import {useQuery} from "@tanstack/react-query";
import { graphqlClient } from "../GraphqlClient/api";
import { getCurrentUserQuery } from "../graphql/query/user";

export const useGetCurrentUser=()=>{
    const query=useQuery({
        queryKey:["current_user"],
        queryFn:()=>graphqlClient.request(getCurrentUserQuery)
    });
    return{...query,user:query.data?.getCurrentUser}
}