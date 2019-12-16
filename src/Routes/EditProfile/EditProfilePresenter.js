import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import FatText from "../../Components/FatText";
import Avatar from "../../Components/Avatar";
import Input from "../../Components/Input";
import Button from "../../Components/Button";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  justify-content: center;
`;

const EAvatar = styled(Avatar)`
  margin-left: auto;
`;

const EUsername = styled.div`
  font-size: 20px;
  font-weight: 400px;
  margin-bottom: 5px;
`;

const EFatText = styled(FatText)`
  font-size: 18px;
`;

const ETable = styled.table`
  width: 100%;
`;

const Row = styled.tr`
  min-height: 50px;
`;

const Aside = styled.td`
  vertical-align: middle;
  text-align: right;
  padding: 10px 30px 10px 0;
`;

const Content = styled.td`
  vertical-align: middle;
  padding: 10px 0 10px 0;
`;

const EInput = styled(Input)`
  width: 360px;
`;

const TextArea = styled.textarea`
  width: 360px;
  height: 100px;
  border: 0;
  border: ${props => props.theme.boxBorder};
  border-radius: ${props => props.theme.borderRadius};
  background-color: ${props => props.theme.bgColor};
  font-size: 12px;
  padding: 15px;
  resize: none;
`;

const EButton = styled(Button)`
  width: 50px;
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
          <form>
            <ETable>
              <tbody>
                <Row>
                  <Aside>
                    <EAvatar size={"md"} url={avatar} />
                  </Aside>
                  <Content>
                    <EUsername>{username}</EUsername>
                    <Link>
                      <EFatText text={"프로필 사진 바꾸기"} />
                    </Link>
                  </Content>
                </Row>
                <Row>
                  <Aside>
                    <EFatText text={"성"} />
                  </Aside>
                  <Content>
                    <EInput value={firstName} />
                  </Content>
                </Row>
                <Row>
                  <Aside>
                    <EFatText text={"이름"} />
                  </Aside>
                  <Content>
                    <EInput value={lastName} />
                  </Content>
                </Row>
                <Row>
                  <Aside>
                    <EFatText text={"사용자 이름"} />
                  </Aside>
                  <Content>
                    <EInput value={username} />
                  </Content>
                </Row>
                <Row>
                  <Aside>
                    <EFatText text={"소개"} />
                  </Aside>
                  <Content>
                    <TextArea value={bio} />
                  </Content>
                </Row>
                <Row>
                  <Aside>
                    <EFatText text={"이메일"} />
                  </Aside>
                  <Content>
                    <EInput value={email} />
                  </Content>
                </Row>
                <Row>
                  <Aside></Aside>
                  <Content>
                    <EButton text={"제출"} />
                  </Content>
                </Row>
              </tbody>
            </ETable>
          </form>
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
