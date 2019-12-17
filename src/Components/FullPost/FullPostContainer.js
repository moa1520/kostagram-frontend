import React, { useState, useEffect } from "react";
import FullPostPresenter from "./FullPostPresenter";
import PropTypes from "prop-types";
import { useMutation } from "react-apollo-hooks";
import { TOGGLE_LIKE, ADD_COMMENT } from "../Post/PostQueries";
import useInput from "../../Hooks/useInput";
import { toast } from "react-toastify";

const FullPostContainer = ({
  postId,
  files,
  location,
  user,
  caption,
  likeCount,
  isLiked,
  comments,
  createdAt
}) => {
  const [isLikedS, setIsLiked] = useState(isLiked);
  const [likeCountS, setLikeCount] = useState(likeCount);
  const [currentItem, setCurrentItem] = useState(0);
  const [selfComments, setSelfComments] = useState([]);
  const comment = useInput("");
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE, {
    variables: { postId }
  });
  const [addCommentMutation] = useMutation(ADD_COMMENT, {
    variables: {
      postId,
      text: comment.value
    }
  });

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

  const toggleLike = () => {
    setIsLiked(!isLikedS);
    if (!isLikedS) {
      setLikeCount(likeCountS + 1);
    } else {
      setLikeCount(likeCountS - 1);
    }
    toggleLikeMutation();
  };

  useEffect(() => {
    const slide = files => {
      const totalFiles = files.length;
      if (currentItem === totalFiles - 1) {
        setTimeout(() => setCurrentItem(0), 3000);
      } else {
        setTimeout(() => setCurrentItem(currentItem + 1), 3000);
      }
    };
    slide(files);
  }, [currentItem, files]);

  return (
    <FullPostPresenter
      files={files}
      location={location}
      user={user}
      caption={caption}
      comments={comments}
      createdAt={createdAt}
      isLiked={isLikedS}
      toggleLike={toggleLike}
      likeCount={likeCountS}
      currentItem={currentItem}
      onKeyPress={onKeyPress}
      selfComments={selfComments}
      newComment={comment}
    />
  );
};

FullPostContainer.propTypes = {
  files: PropTypes.array.isRequired,
  location: PropTypes.string,
  user: PropTypes.object.isRequired,
  caption: PropTypes.string.isRequired,
  likeCount: PropTypes.number.isRequired,
  comments: PropTypes.array.isRequired,
  createdAt: PropTypes.string.isRequired
};

export default FullPostContainer;
