import axios from "axios";
import { prismaClient } from "../../clients/db";
import JWTService from "../../services/jwt";
import { GraphqlContext } from "../../interface";

interface GoogleTokenResult {
    sub?: string
    email: string
    email_verified: string
    name?: string
    picture?: string;
    given_name: string
    family_name: string
}

const queries={
    verifyGoogleToken:async(parent:any,{token}:{token:string})=>{
        const googleToken=token ;
        console.log(googleToken)
        const googleOauthURL=new URL("https://www.googleapis.com/oauth2/v3/userinfo")

        const {data}=await axios.get(googleOauthURL.toString(), {
            headers: { Authorization: `Bearer ${googleToken}` } // Move this into the config object
            });
        // console.log(data)

        const user=await prismaClient.user.findUnique({where:{email:data.email},})

        if(!user){
            await prismaClient.user.create({
                data: {
                        email: data.email,
                        firstName: data.given_name,
                        lastName: data.family_name,
                        profileImageURL: data.picture
                    }
            })
        }
        const userInDb=await prismaClient.user.findUnique({where:{email:data.email},})

        if(!userInDb){
            throw new Error("User with email not found")
        }
        const userToken= JWTService.generateTokenForUser(userInDb)
        return userToken;
    },
    getCurrentUser:async(parent:any, args: any,ctx:GraphqlContext)=>{
        const userid=ctx.user?.id;
        console.log(ctx.user)
        if (!userid) return null;
        const user=await prismaClient.user.findUnique({where:{id:userid}})
        // console.log(user);
        return user
        
    }
}

export const resolvers={queries}