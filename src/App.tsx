import React, { useEffect } from "react";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Wallet from "./pages/Wallet";
import EditProfile from "./pages/EditProfile";
import Profile from "pages/UserProfile";
import Admin from "./pages/Admin";
import ForgotPassword from "./pages/ForgotPassword";
import { identityHandler } from "./identity/core";
import { history } from "./helpers/history";
import { Router, Route, Switch } from "react-router-dom";

import "./App.css";

function App() {
  window.addEventListener("message", identityHandler);
  return (
    <>
      <iframe
        id="identity"
        frameBorder="0"
        src={"https://identity.bitclout.com/embed"}
        style={{
          height: "100vh",
          width: "100vw",
          display: "none",
        }}
      />
      <Router history={history}>
        <Route exact path="/" component={Home} />
        <Route path="/register/:id?" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/wallet" component={Wallet} />
        <Route exact path="/profile" component={EditProfile} />
        <Switch>
          <Route path="/profile/:username" component={Profile} />
        </Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/forgot" component={ForgotPassword} />
      </Router>
    </>
  );
}
export default App;
