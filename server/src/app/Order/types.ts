export const types=`#graphql
    #graphql
    input ProductInput {
        name: String!
        id: String!
        price: Int!
        quantity: Int!
    }

    input CreatingOrderData{
        total:Int!
        address:String 
        Products:[ProductInput!]!
    }
    scalar Date
    type Order{
        id:String
        userId:String
        total:Int
        address:String
        User:User
        Product:[Product]
        quantity: Int
        createdAt: Date
    }
`