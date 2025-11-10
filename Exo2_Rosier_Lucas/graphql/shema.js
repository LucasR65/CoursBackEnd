import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Task {
    _id: ID!
    title: String!
    description: String
  }

  type User {
    _id: ID!
    name: String
    email: String!
  }

  type AuthData {
    userId: ID!
    email: String!
    token: String!
  }

  type Query {
    tasks: [Task!]!
    me: User
  }

  type Mutation {
    addTask(title: String!, description: String): Task!
    signup(name: String, email: String!, password: String!): AuthData!
    login(email: String!, password: String!): AuthData!
  }
`;
