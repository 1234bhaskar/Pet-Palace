export const types=`#graphql
    #graphql

    input CreatingOrderData{
        total:Int!
        address:String 
        ProductId:[ID]!
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