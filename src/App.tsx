import React, { useState, useEffect } from "react";
import "./App.css";
import env from "./components/data/env.json";
import Home from "./pages/Home";
import {
  useAppSelector,
  useAppDispatch,
  useInterval,
} from "./components/hooks";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import PostAd from "./pages/PostAd";
import Buy from "./pages/Buy";
import Manage from "./pages/Manage";
import UserListings from "./pages/UserListings";
import EditProfile from "./pages/EditProfile";
import Admin from "./pages/Admin";

import { logout, getPrice } from "./actions/auth";
import { history } from "./helpers/history";
import { Router, Route } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import axios from "axios";
import NavBar from "./components/NavBar";
import type { RootState } from "./store";
import { connect } from "react-redux";
import PrivateRoute from "./components/PrivateRoute";
const theme = createMuiTheme({
  typography: {
    fontFamily: ["Roboto Mono", "sans-serif"].join(","),
  },
});

const mapStateToProps = (state: RootState) => ({ auth: state.auth });
function App(props: any) {
  const dispatch = useAppDispatch();
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const { user: currentUserT } = useAppSelector((state) => state.auth);
  const [currentUser, setCurrentUser] = useState(currentUserT);

  console.log(currentUser, currentUserT, isLoggedIn);

  if (currentUser && Object.keys(currentUser).length === 0) {
    dispatch(logout() as any);
  }
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getPrice() as any);

      axios
        .post(`${env.url}/uid/`, { id: currentUser._id })
        .then((response) => {
          setCurrentUser(response.data);
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  return (
        <Container style={{ marginLeft: 0}}>
     
          <Router history={history}>
            <Row>

                <Route exact path="/" component={Home} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/logout" component={Logout} />
                <Route exact path="/postad" component={PostAd} />
                <Route exact path="/buy/:id" component={Buy} />
                <Route exact path="/userlistings" component={UserListings} />
                <Route exact path="/profile" component={EditProfile} />
                <PrivateRoute exact path="/manage/:id" component={Manage} />
                
            </Row>
          </Router>
     
      </Container>
  );
}
export default connect(mapStateToProps)(App);
