import { prismaClient } from "../../clients/db"

 const query={
    getAllSellers:async()=>{
        const Sellers=prismaClient.user.findMany({
            where:{role:"Seller"},include:{}
        });
        return Sellers;
    }
}

export const resolvers={query}