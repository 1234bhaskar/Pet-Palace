export const types=`#graphql

 input CreatingProductData{
    name:String!
    description:String!
    price:Float!
    categoryIds: [Int!]!   
    images:String
    sellerId:String!

 }
type Product{
    id:ID!
    name:String!
    description:String!
  price:Float!
  stock:Boolean!
  categories:[String]          
  images:String
  sellerId:String!
  seller:User!
}
`