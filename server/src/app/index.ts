import { ApolloServer } from "@apollo/server";
import {expressMiddleware} from "@apollo/server/express4"
import bodyParser from "body-parser";
import express from "express"


export async function initServer(){
    const app=express();
    app.use(bodyParser.json());
    const graphqlServer=new ApolloServer({
        typeDefs:"",
        resolvers:{},
    })

    await graphqlServer.start();
    app.use("/graphql",expressMiddleware(graphqlServer));
    return app;
}