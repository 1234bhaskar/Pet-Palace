import axios from "axios";
import { prismaClient } from "../../clients/db";
import JWTService from "../../services/jwt";
import { GraphqlContext } from "../../interface";
import { Role } from '@prisma/client';


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
    verifyGoogleToken:async(parent:any,{token,role}:{token:string,role:string})=>{
        if(!role) {
            throw new Error("Give Role")
        }
        const mappedRole = Role[role as keyof typeof Role];

        if (!mappedRole) {
            throw new Error("Invalid Role");
        }
        console.log(mappedRole);
        
        const googleToken=token ;
        console.log(googleToken)
        const googleOauthURL=new URL("https://www.googleapis.com/oauth2/v3/userinfo")

        const {data}=await axios.get<GoogleTokenResult>(googleOauthURL.toString(), {
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
                        profileImageURL: data.picture,
                        role:mappedRole
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
        // console.log(ctx.user)
        if (!userid) return null;
        const user=await prismaClient.user.findUnique({where:{id:userid}})
        // console.log(user);
        return user
        
    }
}

export const resolvers={queries}