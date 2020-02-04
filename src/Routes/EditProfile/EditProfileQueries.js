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

export const EDIT_USER = gql`
  mutation editUser(
    $username: String
    $email: String
    $firstName: String
    $lastName: String
    $bio: String
    $avatar: String
  ) {
    editUser(
      username: $username
      email: $email
      firstName: $firstName
      lastName: $lastName
      bio: $bio
      avatar: $avatar
    ) {
      id
    }
  }
`;
