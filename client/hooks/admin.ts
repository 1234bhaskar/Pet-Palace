import { useQuery } from "@tanstack/react-query"
import { graphqlClient } from "../GraphqlClient/api"
import { getAllOrdersQuery, getAllSellersQuery } from "../graphql/query/admin"

export const useGetAllOrders=()=>{
const query=useQuery({
    queryKey:['orders'],
    queryFn:async()=> await graphqlClient.request(getAllOrdersQuery)
})
return {...query,orders:query.data?.getAllOrder}
}

export const useGetAllSellers=()=>{
    const query=useQuery({
        queryKey:['all-Sellers'],
        queryFn:async()=> await graphqlClient.request(getAllSellersQuery)
    })
    return {sellers:query.data?.getAllSellers}
}