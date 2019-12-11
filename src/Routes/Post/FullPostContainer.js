import React from "react";
import FullPostPresenter from "./FullPostPresenter";
import { useQuery } from "react-apollo-hooks";
import { FULL_POST } from "./FullPostQueries";

const FullPostContainer = ({
  match: {
    params: { postId }
  }
}) => {
  const { data, loading } = useQuery(FULL_POST, {
    variables: {
      id: postId
    }
  });
  return <FullPostPresenter data={data} loading={loading} />;
};

export default FullPostContainer;
