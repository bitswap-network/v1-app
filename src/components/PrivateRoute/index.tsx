import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAppSelector } from "../../components/hooks";
import env from "../data/env.json";
import axios from "axios";

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
