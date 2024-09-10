export const queries=`#graphql
    getAllProduct:[Product]
    getProuctById(id:String):Product
    getAllCategories:[Category]
    getProductsBySearch(searchTerm:String):[Product]
`