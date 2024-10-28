const  {gql} = require('apollo-server-express')

const typeDefs = gql`

scalar Upload

type User {
  _id: ID!
  username: String!
  email: String!
  password: String!
}

type File {
  _id: ID!
  filename: String!
  contentType: String
  uploadDate: String!
}

type FileResponse {
  success: Boolean!
  message: String
  fileId: ID
  downloadUrl: String
}

type Auth {
token: ID
user: User
}

type Query {
getAllUsers: [User]
getAllFiles: [File]
getFile(fileId: ID!): FileResponse
}

type Mutation {
addUser(username: String!, email: String!, password: String!): AuthResponse!
uploadFile(file: Upload!): FileResponse!
}

type AuthResponse {
token: String
user: User
}
`

module.exports = typeDefs;