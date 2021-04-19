import { Route, Redirect } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loggedInState, userState } from "../../store";

const PrivateRoute = ({ component: Component, ...rest }: any) => {
  const user = useRecoilValue(userState);

  return (
    <Route
      {...rest}
      render={props =>
        user ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
