import JWT  from "jsonwebtoken";
import {prismaClient} from "../clients/db"
import { User } from "@prisma/client";

const JWT_secret="@#$%^181668dnncdnkj938(*%*&^"
class JWTService{
    public static async generateTokenForUser(user:User){
        const payload={
            id:user?.id,
            email:user?.email
        };
        const token=JWT.sign(payload,JWT_secret);
        return token;
    }
}


export default JWTService;