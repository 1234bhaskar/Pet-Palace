export const types=`#graphql
    #graphql

    input CreatingOrderData{
        total:Int!
        address:String 
        ProductId:[ID]!
    }
    
    type Order{
        id:String
        userId:String
        total:Int
        address:String
        Product:[Product]
    }
`