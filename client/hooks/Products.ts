import { useQuery } from "@tanstack/react-query";
import {getAllProductQuery} from "../graphql/query/products";
import { graphqlClient } from "../GraphqlClient/api";

export const useGetAllProducts=()=>{
    const query=useQuery({
        queryKey:['all-products'],
        queryFn: async()=> await graphqlClient.request(getAllProductQuery)
    })
    return {...query,product:query.data?.getAllProduct}
}