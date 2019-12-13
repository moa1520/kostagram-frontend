import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import styled from "styled-components";
import Loader from "../Components/Loader";
import FullPost from "../Components/FullPost";

const Wrapper = styled.div`
  min-height: 80vh;
`;

const FULL_POST = gql`
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

const Post = ({
  match: {
    params: { postId }
  }
}) => {
  const { data, loading } = useQuery(FULL_POST, {
    variables: {
      id: postId
    }
  });

  return (
    <Wrapper>
      {loading && <Loader />}
      {!loading && data && (
        <FullPost
          postId={postId}
          files={data.seeFullPost.files}
          location={data.seeFullPost.location}
          user={data.seeFullPost.user}
          caption={data.seeFullPost.caption}
          likeCount={data.seeFullPost.likeCount}
          isLiked={data.seeFullPost.isLiked}
          comments={data.seeFullPost.comments}
          createdAt={data.seeFullPost.createdAt}
        />
      )}
    </Wrapper>
  );
};

export default Post;
