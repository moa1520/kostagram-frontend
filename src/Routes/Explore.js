import React from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../Components/Loader";
import SquarePost from "../Components/SquarePost";
import FatText from "../Components/FatText";

const Wrapper = styled.div`
  min-height: 80vh;
`;

const Posts = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 300px);
  grid-template-rows: 300px;
  grid-auto-rows: 300px;
`;

const Tab = styled.h2`
  color: ${props => props.theme.darkGreyColor};
  font-size: 14px;
  margin-bottom: 16px;
`;

const EXPLORE_QUERY = gql`
  {
    explorePost {
      id
      files {
        id
        url
      }
      likeCount
      commentCount
    }
  }
`;

const Explore = () => {
  const { data, loading } = useQuery(EXPLORE_QUERY);
  return loading ? (
    <Wrapper>
      <Loader />
    </Wrapper>
  ) : (
    <Wrapper>
      <Tab>
        <FatText text={"탐색 탭"} />
      </Tab>
      <Posts>
        {data.explorePost.map(post => (
          <SquarePost
            key={post.id}
            postId={post.id}
            likeCount={post.likeCount}
            commentCount={post.commentCount}
            file={post.files[0]}
          />
        ))}
      </Posts>
    </Wrapper>
  );
};

export default Explore;
