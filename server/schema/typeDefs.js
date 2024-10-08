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

type Query {
getAllUser: [User]
getAllStory: [Story]
}
`

module.exports = typeDefs;