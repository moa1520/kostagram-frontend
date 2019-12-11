import { gql } from "apollo-boost";

export const FULL_POST = gql`
  query seeFullPost($id: String!) {
    seeFullPost(id: $id) {
      files {
        id
        url
      }
      location
      user {
        id
        avatar
        username
        fullName
      }
      caption
      likeCount
      comments {
        id
        user {
          id
          avatar
          username
        }
        createdAt
        text
      }
      isLiked
      createdAt
    }
  }
`;
