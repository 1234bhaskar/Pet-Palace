import { ApolloServer } from "@apollo/server";
import {expressMiddleware} from "@apollo/server/express4"
import bodyParser from "body-parser";
import express from "express"
import { User } from "./user";
import cors from 'cors'
import { GraphqlContext } from "../interface";
import JWTService from "../services/jwt";
import { Seller } from "./seller";
import { Client } from "./Client";
import { Order } from "./Order";

export async function initServer(){
    const app=express();
    app.use(cors())
    app.use(bodyParser.json());
    const graphqlServer=new ApolloServer<GraphqlContext>({
        typeDefs:`
            ${User.types}
            ${Seller.types}
            ${Client.types}
            ${Order.types}

        type Query{
            ${User.queries}
            ${Seller.queries}
            ${Client.queries}
            ${Order.queries}
        }

        type Mutation{
            ${Seller.muataion}
            ${Order.mutation}
        }

        `,

        
        resolvers:{
            Query:{
                ...User.resolvers.queries,
                ...Seller.resolvers.queries,
                ...Client.resolver.queries,
                ...Order.resolvers.queries
            },
            Mutation:{
                ...Seller.resolvers.mutations,
                ...Order.resolvers.mutations
            },
            ...Client.resolver.extraResolver,
            ...Order.resolvers.extraResolver
        },
    })

    await graphqlServer.start();
    app.use("/graphql",expressMiddleware(graphqlServer,{
        context:async({req,res})=>{
            const token = req.headers.authorization?.split("Bearer ")[1];
            const user = token ? await JWTService.decodeToken(token) : undefined; // Await the promise here
            return{ 
                user
            };
        }
    }));
    return app;
}