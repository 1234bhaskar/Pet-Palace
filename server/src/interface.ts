import { Category } from "@prisma/client";

export interface JWTUser{
    id:string,
    email:string,
    createdAt:Date
}
export interface GraphqlContext{
    user?:JWTUser;
}

export interface CreateProductPayload{
    name:string,
    description:string,
    price:number,
  categoryIds: number[],
    images:string
    sellerId:string
}