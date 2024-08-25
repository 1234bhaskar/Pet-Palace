import { useQuery } from "@tanstack/react-query";
import {getAllProductQuery, getProductByIdQuery} from "../graphql/query/products";
import { graphqlClient } from "../GraphqlClient/api";

export const useGetAllProducts=()=>{
    const query=useQuery({
        queryKey:['all-products'],
        queryFn: async()=> await graphqlClient.request(getAllProductQuery)
    })
    return {...query,product:query.data?.getAllProduct}
}

export const useGetProductById=(id:string)=>{
   const query=useQuery({
    queryKey:['productById',id],
    queryFn:async()=> await graphqlClient.request(getProductByIdQuery,{getProuctByIdId:id})
   })
 return {product:query.data?.getProuctById}
}