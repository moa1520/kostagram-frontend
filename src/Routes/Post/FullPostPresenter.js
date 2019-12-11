import React from "react";
import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";
import { Link } from "react-router-dom";
import Loader from "../../Components/Loader";
import Helmet from "react-helmet";
import Avatar from "../../Components/Avatar";
import FatText from "../../Components/FatText";
import Date from "../../Components/Date";
import { HeartFull, Comment as CommentIcon } from "../../Components/Icons";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
  a {
    color: inherit;
  }
`;

const Container = styled.div`
  ${props => props.theme.whiteBox};
  width: 100%;
  display: flex;
`;

const Image = styled.div`
  max-width: 600px;
  width: 100%;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  height: 600px;
`;

const RightContents = styled.div`
  width: 100%;
  max-width: 335px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  height: 70px;
  border-bottom: ${props => props.theme.boxBorder};
`;

const UserColumn = styled.div``;

const Location = styled.span`
  margin-top: 5px;
  display: block;
  font-size: 12px;
`;

const EAvatar = styled(Avatar)`
  margin-right: 5px;
`;

const Text = styled.div`
  margin: 10px 0;
  display: block;
`;

const UserName = styled(Link)``;

const Comments = styled.div`
  padding: 0 15px;
  margin-top: 20px;
  border-bottom: ${props => props.theme.boxBorder};
  min-height: 375px;
`;

const Comment = styled.div`
  display: flex;
  min-height: 60px;
  span {
    margin-right: 5px;
  }
`;

const Content = styled.div`
  display: flex;
`;

const Day = styled.div`
  color: ${props => props.theme.darkGreyColor};
  margin: 0px 10px 10px 35px;
`;

const Utils = styled.div`
  border-bottom: ${props => props.theme.boxBorder};
  padding: 10px;
`;

const Button = styled.span`
  cursor: pointer;
`;

const Buttons = styled.div`
  ${Button} {
    &:first-child {
      margin-right: 10px;
    }
  }
  margin-bottom: 10px;
`;

const Textarea = styled(TextareaAutosize)`
  border: none;
  width: 100%;
  resize: none;
  font-size: 14px;
  &:focus {
    outline: none;
  }
  padding: 20px;
`;

const FullPostPresenter = ({ data, loading }) => {
  if (loading) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else {
    const {
      seeFullPost: {
        files,
        location,
        user,
        caption,
        likeCount,
        comments,
        isLiked,
        createdAt
      }
    } = data;
    return (
      <Wrapper>
        <Helmet>
          <title>
            Kostagram의 {user.fullName}님: "{caption}"
          </title>
        </Helmet>
        <Container>
          {files && <Image key={files[0].id} src={files[0].url} />}
          <RightContents>
            <Header>
              <EAvatar size={"sm"} url={user.avatar} />
              <UserColumn>
                <Link to={`/${user.username}`}>
                  <FatText text={user.username} />
                </Link>
                <Location>{location}</Location>
              </UserColumn>
            </Header>
            <Comments>
              <Comment>
                <Text>
                  <Content>
                    <EAvatar size={"sm"} url={user.avatar} />
                    <UserName to={`/${user.username}`}>
                      <FatText text={user.username} />
                    </UserName>
                    {caption}
                  </Content>
                  <Day>{Date(createdAt)}</Day>
                </Text>
              </Comment>
              {comments &&
                comments.map(comment => (
                  <Comment key={comment.id}>
                    <Text>
                      <Content>
                        <EAvatar
                          key={comment.user.id}
                          size={"sm"}
                          url={comment.user.avatar}
                        />
                        <UserName to={`/${comment.user.username}`}>
                          <FatText text={comment.user.username} />
                        </UserName>
                        {comment.text}
                      </Content>
                      <Day>{Date(comment.createdAt)}</Day>
                    </Text>
                  </Comment>
                ))}
            </Comments>
            <Utils>
              <Buttons>
                <Button>
                  <HeartFull />
                </Button>
                <Button>
                  <CommentIcon />
                </Button>
              </Buttons>
              <FatText text={`좋아요 ${likeCount}개`} />
            </Utils>
            <Textarea placeholder={"댓글달기..."} />
          </RightContents>
        </Container>
      </Wrapper>
    );
  }
};

export default FullPostPresenter;
