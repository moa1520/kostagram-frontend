import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useInput from "../../Hooks/useInput";
import PostPresenter from "./PostPresenter";
import { useMutation } from "react-apollo-hooks";
import { TOGGLE_LIKE, ADD_COMMENT, DELETE_COMMENT } from "./PostQueries";
import { toast } from "react-toastify";

const PostContainer = ({
  id,
  user,
  files,
  likeCount,
  isLiked,
  comments,
  createdAt,
  caption,
  location
}) => {
  const [isLikedS, setIsLiked] = useState(isLiked);
  const [likeCountS, setLikeCount] = useState(likeCount);
  const [currentItem, setCurrentItem] = useState(0);
  const [selfComments, setSelfComments] = useState([]);
  const comment = useInput("");
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    variables: { postId: id }
  });
  const [addCommentMutation] = useMutation(ADD_COMMENT, {
    variables: {
      postId: id,
      text: comment.value
    }
  });
  const [deleteCommentMutation] = useMutation(DELETE_COMMENT);

  const toggleLike = () => {
    setIsLiked(!isLikedS);
    if (!isLikedS) {
      setLikeCount(likeCountS + 1);
    } else {
      setLikeCount(likeCountS - 1);
    }
    toggleLikeMutation();
  };

  const onKeyPress = async e => {
    const { which } = e;
    if (which === 13) {
      e.preventDefault();
      comment.setValue("");
      try {
        const {
          data: { addComment }
        } = await addCommentMutation();
        setSelfComments([...selfComments, addComment]);
      } catch {
        toast.error("댓글을 달 수 없습니다.");
      }
    }
  };

  const handleDelete = async id => {
    try {
      await deleteCommentMutation({
        variables: {
          id
        }
      });
      window.location.reload();
    } catch (e) {
      toast.error("댓글을 삭제할 수 없습니다.");
    }
  };

  useEffect(() => {
    const slide = () => {
      const totalFiles = files.length;
      if (currentItem === totalFiles - 1) {
        setTimeout(() => setCurrentItem(0), 3000);
      } else {
        setTimeout(() => setCurrentItem(currentItem + 1), 3000);
      }
    };
    slide();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentItem]);

  return (
    <PostPresenter
      user={user}
      files={files}
      likeCount={likeCountS}
      isLiked={isLikedS}
      comments={comments}
      createdAt={createdAt}
      newComment={comment}
      caption={caption}
      location={location}
      currentItem={currentItem}
      toggleLike={toggleLike}
      onKeyPress={onKeyPress}
      selfComments={selfComments}
      handleDelete={handleDelete}
    />
  );
};

PostContainer.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired
  }).isRequired,
  files: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired,
  likeCount: PropTypes.number.isRequired,
  isLiked: PropTypes.bool.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired
      }).isRequired
    })
  ).isRequired,
  createdAt: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  location: PropTypes.string
};

export default PostContainer;
