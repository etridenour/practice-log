export const typeDefs = `#graphql
  type Session {
    id: ID!
    instrument: String!
    duration: Int!
    tempo: [Int]
    notes: String
    createdAt: String!
  }

  type Query {
    sessions: [Session!]!
    session(id: ID!): Session
  }

  input CreateSessionInput {
    instrument: String!
    duration: Int!
    tempo: [Int]
    notes: String
  }

  type Mutation {
    createSession(input: CreateSessionInput!): Session!
    deleteSession(id: ID!): Boolean!
  }
`;
