import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Avatar from "./Avatar";
import FatText from "./FatText";
import Button from "./Button";

const Card = styled.div``;

const UserCard = ({ username, url, isFollowing, isSelf }) => (
  <Card>
    <Avatar url={url} />
    <FatText text={username} />
    {!isSelf && <Button text={isFollowing ? "언팔로우" : "팔로우"} />}
  </Card>
);

UserCard.propTypes = {
  username: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  isSelf: PropTypes.bool.isRequired
};

export default UserCard;
