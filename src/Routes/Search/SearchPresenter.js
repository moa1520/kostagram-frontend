import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import FatText from "../../Components/FatText";

const Wrapper = styled.div`
  height: 50vh;
  text-align: center;
`;

const SearchPresenter = ({ searchTerm, loading }) => (
  <Wrapper>
    {searchTerm === undefined && <FatText text="검색어를 입력하세요" />}
  </Wrapper>
);

SearchPresenter.propTypes = {
  searchTerm: PropTypes.string,
  loading: PropTypes.bool.isRequired
};

export default SearchPresenter;
