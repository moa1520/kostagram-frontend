import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Input from "../../Components/Input";
import FatText from "../../Components/FatText";
import Avatar from "../../Components/Avatar";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  a {
    color: inherit;
  }
`;

const Container = styled.div`
  ${props => props.theme.whiteBox};
  width: 100%;
  display: flex;
`;

const LeftContainer = styled.ul`
  width: 35%;
  border-right: ${props => props.theme.boxBorder};
`;

const LeftContent = styled.li`
  padding: 20px;
  font-size: 16px;
  border-left: ${props =>
    props.selected ? "solid 2px black" : "solid 2px white"};
  font-weight: ${props => (props.selected ? "600" : "none")};
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.bgColor};
    border-left: ${props => `solid 2px ${props.theme.lightGreyColor}`};
  }
`;

const RightContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 40px;
`;

const RLContent = styled.div`
  width: 30%;
`;

const RRContent = styled.div`
  width: 100%;
`;

const EAvatar = styled(Avatar)`
  margin-left: auto;
  margin-right: 20px;
`;

const EUsername = styled.div`
  font-size: 20px;
  font-weight: 400px;
`;

const EditProfilePresenter = ({
  avatar,
  username,
  email,
  firstName,
  lastName,
  bio
}) => {
  return (
    <Wrapper>
      <Container>
        <LeftContainer>
          <LeftContent selected={true}>프로필 편집</LeftContent>
          <LeftContent selected={false}>비밀번호 변경</LeftContent>
          <LeftContent selected={false}>앱 및 웹사이트</LeftContent>
          <LeftContent selected={false}>이메일 및 SMS</LeftContent>
          <LeftContent selected={false}>연락처 관리</LeftContent>
          <LeftContent selected={false}>공개 범위 및 보안</LeftContent>
          <LeftContent selected={false}>로그인 활동</LeftContent>
        </LeftContainer>
        <RightContainer>
          <RLContent>
            <EAvatar size={"md"} url={avatar} />
          </RLContent>
          <RRContent>
            <EUsername>{username}</EUsername>
          </RRContent>
        </RightContainer>
      </Container>
    </Wrapper>
  );
};

EditProfilePresenter.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  bio: PropTypes.string
};

export default EditProfilePresenter;
