import React from "react";
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import EditProfilePresenter from "./EditProfilePresenter";
import { EDIT_PROFILE_QUERY } from "./EditProfileQueries";
import Loader from "../../Components/Loader";

const Wrapper = styled.div`
  min-height: 80vh;
`;

const EditProfile = () => {
  const { data, loading } = useQuery(EDIT_PROFILE_QUERY);
  if (loading) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  } else {
    const { avatar, username, email, firstName, lastName, bio } = data.me;
    return (
      <EditProfilePresenter
        avatar={avatar}
        username={username}
        email={email}
        firstName={firstName}
        lastName={lastName}
        bio={bio}
      />
    );
  }
};

export default EditProfile;
