import { gql } from "apollo-boost";

export const EDIT_PROFILE_QUERY = gql`
  query me {
    me {
      avatar
      username
      email
      firstName
      lastName
      bio
    }
  }
`;
