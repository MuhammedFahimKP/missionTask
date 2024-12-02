import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import type { RootState } from "@/store";

const WithBaseicAuth = <T extends Object>(Component: React.FC<T>) => {
  const AuthenticatedComponent = (props: T) => {
    const isAuthenticated = useSelector(
      (rootState: RootState) => rootState.persistedReducer.auth.user
    );

    if (isAuthenticated) {
      return <Component {...props} />;
    }
    return <Navigate to="/signin/" replace />;
  };

  return AuthenticatedComponent;
};

export default WithBaseicAuth;
