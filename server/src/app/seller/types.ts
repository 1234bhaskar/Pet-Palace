export const types=`#graphql

 input CreatingProductData{
    name:String!
    description:String!
    price:Int!
    categoryIds: [Int!]!   
    images:String

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