import { gql } from 'apollo-angular';

export const GET_SESSIONS = gql`
  query GetSessions {
    sessions {
      id
      instrument
      duration
      tempo
      notes
      createdAt
    }
  }
`;

export const CREATE_SESSION = gql`
  mutation CreateSession($input: CreateSessionInput!) {
    createSession(input: $input) {
      id
      instrument
      duration
      tempo
      notes
      createdAt
    }
  }
`;

export const DELETE_SESSION = gql`
  mutation DeleteSession($id: ID!) {
    deleteSession(id: $id)
  }
`;
