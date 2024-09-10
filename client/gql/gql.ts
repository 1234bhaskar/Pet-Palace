/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    #graphql\n    mutation CreateProduct($payload: CreatingProductData!) {\n        createProduct(payload: $payload)\n    }\n": types.CreateProductDocument,
    "#graphql\nquery GetAllOrder {\n getAllOrder {\n            User {\n                firstName\n                lastName\n                email\n            }\n            Product {\n                name\n            }\n            total\n            quantity\n            createdAt\n            id\n}\n}\n    ": types.GetAllOrderDocument,
    "#graphql\n    query GetAllSellers {\n    getAllSellers {\n        firstName\n        lastName\n        profileImageURL\n        createdAt\n    }\n    }\n": types.GetAllSellersDocument,
    "\n    #graphql\n     query GetAllProduct {\n     getAllProduct {\n    id\n    name\n    price\n    description\n    images\n    seller {\n      firstName\n      lastName\n    }\n    categories\n  }\n}  \n    ": types.GetAllProductDocument,
    "\n  #graphql\n  query GetProuctById($getProuctByIdId: String!) {\n  getProuctById(id: $getProuctByIdId) {\n    id\n    images\n    name\n    price\n    stock\n    description\n    categories\n  }\n}\n  ": types.GetProuctByIdDocument,
    "\n      #graphql\n    query GetProductsBySearch($searchTerm: String) {\n    getProductsBySearch(searchTerm: $searchTerm) {\n    name\n    description\n    categories\n    id\n    price\n    images\n  }\n}\n      ": types.GetProductsBySearchDocument,
    "\n    #graphql\n    query GetSignedURLForProduct($imageName: String!, $imageType: String!) {\n        getSignedURLForProduct(imageName: $imageName, imageType: $imageType)\n    }     \n": types.GetSignedUrlForProductDocument,
    "\n    #graphql\n    query VerifyGoogleToken($token: String!,$role: String) {\n        verifyGoogleToken(token: $token,role: $role)\n    }\n": types.VerifyGoogleTokenDocument,
    "\n    #graphql\n    query GetCurrentUser {\n        getCurrentUser {\n            id\n            lastName\n            firstName\n            profileImageURL\n        }\n    }      \n": types.GetCurrentUserDocument,
    "\n    #graphql\n    query GetAllCategories {\n        getAllCategories {\n            name\n        }\n    }\n": types.GetAllCategoriesDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    mutation CreateProduct($payload: CreatingProductData!) {\n        createProduct(payload: $payload)\n    }\n"): (typeof documents)["\n    #graphql\n    mutation CreateProduct($payload: CreatingProductData!) {\n        createProduct(payload: $payload)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\nquery GetAllOrder {\n getAllOrder {\n            User {\n                firstName\n                lastName\n                email\n            }\n            Product {\n                name\n            }\n            total\n            quantity\n            createdAt\n            id\n}\n}\n    "): (typeof documents)["#graphql\nquery GetAllOrder {\n getAllOrder {\n            User {\n                firstName\n                lastName\n                email\n            }\n            Product {\n                name\n            }\n            total\n            quantity\n            createdAt\n            id\n}\n}\n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "#graphql\n    query GetAllSellers {\n    getAllSellers {\n        firstName\n        lastName\n        profileImageURL\n        createdAt\n    }\n    }\n"): (typeof documents)["#graphql\n    query GetAllSellers {\n    getAllSellers {\n        firstName\n        lastName\n        profileImageURL\n        createdAt\n    }\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n     query GetAllProduct {\n     getAllProduct {\n    id\n    name\n    price\n    description\n    images\n    seller {\n      firstName\n      lastName\n    }\n    categories\n  }\n}  \n    "): (typeof documents)["\n    #graphql\n     query GetAllProduct {\n     getAllProduct {\n    id\n    name\n    price\n    description\n    images\n    seller {\n      firstName\n      lastName\n    }\n    categories\n  }\n}  \n    "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  #graphql\n  query GetProuctById($getProuctByIdId: String!) {\n  getProuctById(id: $getProuctByIdId) {\n    id\n    images\n    name\n    price\n    stock\n    description\n    categories\n  }\n}\n  "): (typeof documents)["\n  #graphql\n  query GetProuctById($getProuctByIdId: String!) {\n  getProuctById(id: $getProuctByIdId) {\n    id\n    images\n    name\n    price\n    stock\n    description\n    categories\n  }\n}\n  "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n      #graphql\n    query GetProductsBySearch($searchTerm: String) {\n    getProductsBySearch(searchTerm: $searchTerm) {\n    name\n    description\n    categories\n    id\n    price\n    images\n  }\n}\n      "): (typeof documents)["\n      #graphql\n    query GetProductsBySearch($searchTerm: String) {\n    getProductsBySearch(searchTerm: $searchTerm) {\n    name\n    description\n    categories\n    id\n    price\n    images\n  }\n}\n      "];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    query GetSignedURLForProduct($imageName: String!, $imageType: String!) {\n        getSignedURLForProduct(imageName: $imageName, imageType: $imageType)\n    }     \n"): (typeof documents)["\n    #graphql\n    query GetSignedURLForProduct($imageName: String!, $imageType: String!) {\n        getSignedURLForProduct(imageName: $imageName, imageType: $imageType)\n    }     \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    query VerifyGoogleToken($token: String!,$role: String) {\n        verifyGoogleToken(token: $token,role: $role)\n    }\n"): (typeof documents)["\n    #graphql\n    query VerifyGoogleToken($token: String!,$role: String) {\n        verifyGoogleToken(token: $token,role: $role)\n    }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    query GetCurrentUser {\n        getCurrentUser {\n            id\n            lastName\n            firstName\n            profileImageURL\n        }\n    }      \n"): (typeof documents)["\n    #graphql\n    query GetCurrentUser {\n        getCurrentUser {\n            id\n            lastName\n            firstName\n            profileImageURL\n        }\n    }      \n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n    #graphql\n    query GetAllCategories {\n        getAllCategories {\n            name\n        }\n    }\n"): (typeof documents)["\n    #graphql\n    query GetAllCategories {\n        getAllCategories {\n            name\n        }\n    }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;