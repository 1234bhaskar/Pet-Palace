import JWT  from "jsonwebtoken";
import {prismaClient} from "../clients/db"
import { User } from "@prisma/client";
import { JWTUser } from "../interface";

const JWT_secret="@#$%^181668dnncdnkj938(*%*&^"
class JWTService{
    public static async generateTokenForUser(user:User){
        const payload:JWTUser={
            id:user?.id,
            email:user?.email,
            createdAt:user.createdAt,
        };
        const token=JWT.sign(payload,JWT_secret);
        return token;
    }
    public static async decodeToken(token:string){
        try{
            return JWT.verify(token,JWT_secret) as JWTUser;
        }
        catch(e){
            // console.log(e)
            return null
        }
    }
}


export default JWTService;