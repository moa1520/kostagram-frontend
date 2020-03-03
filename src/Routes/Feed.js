import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Post from "../Components/Post";
import withSuspense from "../Components/withSuspense";

const FEED_QUREY = gql`
  {
    seeFeed {
      id
      location
      caption
      user {
        id
        avatar
        username
      }
      files {
        id
        url
      }
      likeCount
      isLiked
      comments {
        id
        text
        user {
          id
          username
        }
      }
      createdAt
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
`;

const Feed = () => {
  const { data } = useQuery(FEED_QUREY, { suspend: true });
  return (
    <Wrapper>
      <Helmet>
        <title>Feed | Kostagram</title>
      </Helmet>
      {data.seeFeed.map(post => (
        <Post
          key={post.id}
          id={post.id}
          user={post.user}
          files={post.files}
          likeCount={post.likeCount}
          isLiked={post.isLiked}
          comments={post.comments}
          createdAt={post.createdAt}
          location={post.location}
          caption={post.caption}
        />
      ))}
    </Wrapper>
  );
};

export default withSuspense(Feed);
