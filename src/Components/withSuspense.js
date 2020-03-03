import React, { Suspense } from "react";
import styled from "styled-components";
import Loader from "./Loader";

const Container = styled.div`
  min-height: 80vh;
`;

const withSuspense = Component => {
  return class extends React.Component {
    render() {
      return (
        <Suspense
          fallback={
            <Container>
              <Loader />
            </Container>
          }
        >
          <Component />
        </Suspense>
      );
    }
  };
};

export default withSuspense;
