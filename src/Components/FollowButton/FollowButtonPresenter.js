import React from "react";
import Button from "../Button";
import styled from "styled-components";

const EButton = styled(Button)`
  background-color: ${props => props.theme.bgColor};
  color: black;
  border: 1px solid ${props => props.theme.lightGreyColor};
  width: 90px;
  height: 30px;
`;

export default ({ isFollowing, onClick }) => (
  <EButton text={isFollowing ? "언팔로우" : "팔로우"} onClick={onClick} />
);
