// import { useQuery } from "@tanstack/react-query";
// import { graphqlClient } from "../GraphqlClient/api";
// import { GetProductsQuery } from "../graphql/query/products";

// export const useGetAllProducts=()=>{
//     const query=useQuery({
//         queryKey:["current_user"],
//         queryFn:()=>graphqlClient.request(GetProductsQuery)
//     });
//     return{...query,product:query.data?.getProducts}
// }