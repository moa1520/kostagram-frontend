import React from "react";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import Helmet from "react-helmet";
import FatText from "../../Components/FatText";
import FollowButton from "../../Components/FollowButton";
import SquarePost from "../../Components/SquarePost";

const Wrapper = styled.div`
  min-height: 100%;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 80%;
  margin: 0 auto;
  margin-right: 100%;
  margin-bottom: 40px;
`;

const HeaderColumn = styled.div``;

const UsernameRow = styled.div`
  display: flex;
  align-items: center;
`;

const EAvatar = styled(Avatar)`
  border: 1px solid rgba(0, 0, 0, 0.2);
`;

const Username = styled.span`
  font-size: 26px;
  font-weight: 300;
  display: block;
`;

const Counts = styled.ul`
  display: flex;
  margin: 30px 0px;
`;

const Count = styled.li`
  font-size: 16px;
  &:not(:last-child) {
    margin-right: 40px;
  }
`;

const FullName = styled(FatText)`
  font-size: 16px;
`;

const Bio = styled.p`
  margin: 10px 0px;
`;

const Posts = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 300px);
  grid-template-rows: 300px;
  grid-auto-rows: 300px;
`;

export default ({ loading, data }) => {
  if (loading) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else {
    console.log(data);
    const {
      seeUser: {
        id,
        avatar,
        username,
        fullName,
        isFollowing,
        isSelf,
        bio,
        followingCount,
        followersCount,
        postsCount,
        posts
      }
    } = data;
    return (
      <Wrapper>
        <Helmet>
          <title>{username} | Kostagram</title>
        </Helmet>
        <Header>
          <HeaderColumn>
            <EAvatar size={"lg"} url={avatar} />
          </HeaderColumn>
          <HeaderColumn>
            <UsernameRow>
              <Username>{username}</Username>{" "}
              {!isSelf && <FollowButton id={id} isFollowing={isFollowing} />}
            </UsernameRow>
            <Counts>
              <Count>
                게시물 <FatText text={postsCount} />
              </Count>
              <Count>
                팔로워 <FatText text={followersCount} />
              </Count>
              <Count>
                팔로우 <FatText text={followingCount} />
              </Count>
            </Counts>
            <FullName text={fullName} />
            <Bio>{bio}</Bio>
          </HeaderColumn>
        </Header>
        <Posts>
          {posts &&
            posts.map(post => (
              <SquarePost
                key={post.id}
                likeCount={post.likeCount}
                commentCount={post.commentCount}
                file={post.files[0]}
              />
            ))}
        </Posts>
      </Wrapper>
    );
  }
};
