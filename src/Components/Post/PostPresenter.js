import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import TextareaAutosize from "react-textarea-autosize";
import FatText from "../FatText";
import Avatar from "../Avatar";
import { HeartFull, HeartEmpty, Comment as CommentIcon, Xmark } from "../Icons";
import Date from "../Date";
import { useQuery } from "react-apollo-hooks";
import { EDIT_PROFILE_QUERY } from "../../Routes/EditProfile/EditProfileQueries";

const Post = styled.div`
  ${props => props.theme.whiteBox};
  width: 100%;
  max-width: 600px;
  margin-bottom: 25px;
  user-select: none;
  a {
    color: inherit;
  }
`;

const Header = styled.header`
  padding: 15px;
  display: flex;
  align-items: center;
`;

const UserColumn = styled.div`
  margin-left: 10px;
`;

const Location = styled.span`
  display: block;
  margin-top: 5px;
  font-size: 12px;
`;

const Files = styled.div`
  position: relative;
  padding-bottom: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-shrink: 0;
`;

const File = styled.div`
  max-width: 100%;
  width: 100%;
  height: 600px;
  position: absolute;
  top: 0;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
  opacity: ${props => (props.showing ? 1 : 0)};
  transition: opacity 0.5s linear;
`;

const Button = styled.span`
  cursor: pointer;
`;

const Meta = styled.div`
  padding: 15px;
`;

const Buttons = styled.div`
  ${Button} {
    &:first-child {
      margin-right: 10px;
    }
  }
  margin-bottom: 10px;
`;

const Timestamp = styled.span`
  font-weight: 400;
  text-transform: uppercase;
  opacity: 0.5;
  display: block;
  font-size: 12px;
  margin: 10px 0px;
  padding-bottom: 10px;
  border-bottom: ${props => props.theme.lightGreyColor} 1px solid;
`;

const Textarea = styled(TextareaAutosize)`
  border: none;
  width: 100%;
  resize: none;
  font-size: 14px;
  &:focus {
    outline: none;
  }
`;

const Comments = styled.ul`
  margin-top: 10px;
`;

const Comment = styled.li`
  margin-bottom: 7px;
  span {
    margin-right: 5px;
  }
`;

const DeleteButton = styled.span`
  opacity: 0.5;
  float: right;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;

export default ({
  user: { username, avatar },
  location,
  caption,
  files,
  isLiked,
  likeCount,
  createdAt,
  newComment,
  currentItem,
  toggleLike,
  onKeyPress,
  comments,
  selfComments,
  handleDelete
}) => {
  const { loading, data } = useQuery(EDIT_PROFILE_QUERY);
  return loading
    ? null
    : data && data.me && (
        <Post>
          <Header>
            <Avatar size="sm" url={avatar} />
            <UserColumn>
              <Link to={`/${username}`}>
                <FatText text={username} />
              </Link>
              <Location>{location}</Location>
            </UserColumn>
          </Header>
          <Files>
            {files &&
              files.map((file, index) => (
                <File
                  key={file.id}
                  src={file.url}
                  showing={index === currentItem}
                />
              ))}
          </Files>
          <Meta>
            <Buttons>
              <Button onClick={toggleLike}>
                {isLiked ? <HeartFull /> : <HeartEmpty />}
              </Button>
              <Button>
                <CommentIcon />
              </Button>
            </Buttons>
            <FatText text={`좋아요 ${likeCount}개`} />
            <Comments>
              <Comment>
                <FatText text={username} />
                {caption}
              </Comment>
            </Comments>
            {comments && (
              <Comments>
                {comments.map(comment => (
                  <Comment key={comment.id}>
                    <FatText text={comment.user.username} />
                    {comment.text}
                    {comment.user.username === data.me.username && (
                      <DeleteButton onClick={() => handleDelete(comment.id)}>
                        <Xmark size={10} />
                      </DeleteButton>
                    )}
                  </Comment>
                ))}
                {selfComments.map(comment => (
                  <Comment key={comment.id}>
                    <FatText text={comment.user.username} />
                    {comment.text}
                    <DeleteButton onClick={() => handleDelete(comment.id)}>
                      <Xmark size={10} />
                    </DeleteButton>
                  </Comment>
                ))}
              </Comments>
            )}
            <Timestamp>{Date(createdAt)}</Timestamp>
            <Textarea
              placeholder={"댓글달기..."}
              value={newComment.value}
              onChange={newComment.onChange}
              onKeyPress={onKeyPress}
            />
          </Meta>
        </Post>
      );
};
