import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Loader from "../../Components/Loader";
import Avatar from "../../Components/Avatar";
import Helmet from "react-helmet";
import FatText from "../../Components/FatText";
import FollowButton from "../../Components/FollowButton";
import SquarePost from "../../Components/SquarePost";
import Button from "../../Components/Button";

const Wrapper = styled.div`
  min-height: 80vh;
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
  margin-right: 20px;
`;

const ELink = styled(Link)`
  margin-right: 10px;
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
  grid-gap: 25px;
  grid-template-columns: repeat(3, 250px);
  grid-template-rows: 250px;
  grid-auto-rows: 250px;
`;

const EButton = styled(Button)`
  background-color: ${props => props.theme.bgColor};
  color: black;
  border: 1px solid ${props => props.theme.lightGreyColor};
  width: 90px;
  height: 30px;
`;

export default ({ loading, data, logOut }) => {
  if (loading) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else {
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
              {isSelf ? (
                <>
                  <ELink to={"/accounts/edit"}>
                    <EButton text={"프로필 편집"} />
                  </ELink>
                  <EButton text={"로그아웃"} onClick={logOut} />
                </>
              ) : (
                <FollowButton id={id} isFollowing={isFollowing} />
              )}
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
                postId={post.id}
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
