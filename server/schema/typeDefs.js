const  {gql} = require('apollo-server-express')

const typeDefs = gql`
type User {
  _id: ID!
  username: String!
  email: String!
  password: String!
}

type Story {
 _id: ID!
 title: String!
 story: String!
}

type Auth {
  token: ID
  user: User
}

type Query {
getAllUser: [User]
getAllStory: [Story]
}

type Mutation {
addUser(username: String!, email: String!, password: String!): Auth
}
`

module.exports = typeDefs;