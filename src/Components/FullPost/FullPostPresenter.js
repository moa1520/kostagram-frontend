import React from "react";
import styled from "styled-components";
import TextareaAutosize from "react-textarea-autosize";
import { Link } from "react-router-dom";
import Helmet from "react-helmet";
import StickyBox from "react-sticky-box";
import Avatar from "../Avatar";
import FatText from "../FatText";
import Date from "../Date";
import { HeartFull, Comment as CommentIcon, HeartEmpty } from "../Icons";
import { useQuery } from "react-apollo-hooks";
import { EDIT_PROFILE_QUERY } from "../../Routes/EditProfile/EditProfileQueries";

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
  max-height: 600px;
`;

const Files = styled.div`
  position: relative;
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-shrink: 0;
`;

const Image = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  transition: opacity 0.5s linear;
  opacity: ${props => (props.showing ? 1 : 0)};
  position: absolute;
`;

const RightContents = styled.div`
  width: 100%;
  max-width: 335px;
  max-height: 600px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  height: 70px;
  width: 100%;
  max-width: 335px;
  border-bottom: ${props => props.theme.boxBorder};
  position: absolute;
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
  margin-top: 70px;
  border-bottom: ${props => props.theme.boxBorder};
  max-height: 395px;
  min-height: 395px;
  overflow: auto;
  overflow-wrap: normal;
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

const DeleteButton = styled.span`
  float: right;
  opacity: 0.5;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
  margin-left: 10px;
`;

const FullPostPresenter = ({
  isLiked,
  files,
  location,
  user,
  caption,
  likeCount,
  toggleLike,
  comments,
  createdAt,
  onKeyPress,
  selfComments,
  newComment,
  currentItem,
  handleDelete
}) => {
  const { loading, data } = useQuery(EDIT_PROFILE_QUERY);
  return loading
    ? null
    : data && data.me && (
        <Wrapper>
          <Helmet>
            <title>
              Kostagram의 {user.fullName}님: "{caption}"
            </title>
          </Helmet>
          <Container>
            <Files>
              {files &&
                files.map((file, index) => (
                  <Image
                    key={file.id}
                    src={file.url}
                    showing={index === currentItem}
                  />
                ))}
            </Files>
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
                <StickyBox offsetTop={10} offsetBottom={10}>
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
                            {comment.user.id === data.me.id && (
                              <DeleteButton
                                onClick={() => handleDelete(comment.id)}
                              >
                                🅧
                              </DeleteButton>
                            )}
                          </Content>
                          <Day>{Date(comment.createdAt)}</Day>
                        </Text>
                      </Comment>
                    ))}
                  {selfComments.map(comment => (
                    <Comment key={comment.id}>
                      <Text>
                        <Content>
                          <EAvatar size={"sm"} url={comment.user.avatar} />
                          <UserName to={`/${comment.user.username}`}>
                            <FatText text={comment.user.username} />
                          </UserName>
                          {comment.text}
                        </Content>
                        <Day>방금 전</Day>
                      </Text>
                    </Comment>
                  ))}
                </StickyBox>
              </Comments>
              <Utils>
                <Buttons>
                  <Button onClick={toggleLike}>
                    {isLiked ? <HeartFull /> : <HeartEmpty />}
                  </Button>
                  <Button>
                    <CommentIcon />
                  </Button>
                </Buttons>
                <FatText text={`좋아요 ${likeCount}개`} />
              </Utils>
              <Textarea
                placeholder={"댓글달기..."}
                value={newComment.value}
                onChange={newComment.onChange}
                onKeyPress={onKeyPress}
              />
            </RightContents>
          </Container>
        </Wrapper>
      );
};

export default FullPostPresenter;
