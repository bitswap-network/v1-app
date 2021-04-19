import { Route, Redirect } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loggedInState } from "../../store";

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const isLoggedIn = useRecoilValue(loggedInState);

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
