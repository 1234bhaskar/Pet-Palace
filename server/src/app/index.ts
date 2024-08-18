import { ApolloServer } from "@apollo/server";
import {expressMiddleware} from "@apollo/server/express4"
import bodyParser from "body-parser";
import express from "express"
import { User } from "./user";
import cors from 'cors'
import { GraphqlContext } from "../interface";
import JWTService from "../services/jwt";
import { Seller } from "./seller";

export async function initServer(){
    const app=express();
    app.use(cors())
    app.use(bodyParser.json());
    const graphqlServer=new ApolloServer<GraphqlContext>({
        typeDefs:`
        ${User.types}
        ${Seller.types}

        type Query{
        ${User.queries}}

        type Mutation{
            ${Seller.muataion}
        }

        `,

        
        resolvers:{
            Query:{
                ...User.resolvers.queries,
            },
            Mutation:{
                ...Seller.resolvers.mutations,
            }

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