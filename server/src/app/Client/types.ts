export const types=`#graphql
    type Product{
    id:ID!
    name:String!
    description:String
    price:Float!
    stock:Boolean!
    categories:[String]          
    images:[String]
    seller:User
    Order:[Order]
}
`