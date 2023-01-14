const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    friends: [User]
    favorites: [BingoList]
}

type BingoList {
    _id: ID
    owner: User
    name: String!
    list: [String]!
}

type BingoCard {
    _id: ID
    owner: User
    parentList: BingoList
    squares: [CardSquare]!
    status: Boolean
}

type CardSquare {
    _id: ID
    text: String!
    location: String!
    col: String
    row: String
    status: Boolean
}

input CardSquareInput {
    text: String!
    location: String!
    status: Boolean
}

type Auth {
    token: ID!
    user: User
}

type Query {
    me: User
    user(username: String!): User
    users: [User]
    card(cardId: ID!): BingoCard
    cards: [BingoCard]
    list(listId: ID!): BingoList
    lists: [BingoList]
    listsByUser(ownerId: ID!): [BingoList]
    cardsByUser(ownerId: ID!): [BingoCard]
}

type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    deleteCard(cardId: ID!): [BingoCard]
    deleteList(listId: ID!): [BingoList]
    login(email: String!, password: String!): Auth
    saveCard(owner: ID, parentList: ID, squares: [CardSquareInput]!, status: Boolean): BingoCard
    saveList(owner: ID, name: String!, list: [String]!): BingoList
    updateCard(cardId: ID!, square: CardSquareInput!): BingoCard
}

`;

module.exports = typeDefs;