import { GraphQLClient } from "graphql-request";

const isClient=typeof window !=="undefined"

export const graphqlClient=new GraphQLClient(
    'http://localhost:8000/graphql',
    {
        headers: () =>({
            Authorization: isClient
            ? `Bearer ${localStorage.getItem("_Pet_Palace")}`
            :""
        })
    }
)