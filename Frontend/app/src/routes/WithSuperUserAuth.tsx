import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import type { RootState } from "@/store";

const WithSuperUserAuth = <T extends Object>(Component: React.FC<T>) => {
  const AuthenticatedComponent = (props: T) => {
    const dept = useSelector(
      (rootState: RootState) => rootState.persistedReducer.auth.user?.dept
    );

    if (dept && ["ADMIN", "HR"].includes(dept)) {
      return <Component {...props} />;
    }
    return <Navigate to="/signin/" replace />;
  };

  return AuthenticatedComponent;
};

export default WithSuperUserAuth;
