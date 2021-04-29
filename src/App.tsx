// Pages
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Wallet from "./pages/Wallet";
import SpecificListing from "./pages/SpecificListing";
// import Buy from "./pages/Buy";
// import Manage from "./pages/Manage";
import UserListings from "./pages/UserListings";
import EditProfile from "./pages/EditProfile";
import Profile from "pages/UserProfile";
import Admin from "./pages/Admin";
import NewListing from "./pages/newUserListing";

import { history } from "./helpers/history";
import { Router, Route, Switch } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <Router history={history}>
      <Route exact path="/" component={Home} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
      <Route exact path="/listing/:id" component={SpecificListing} />
      <Route path="/wallet" component={Wallet} />
      <Route path="/userlistings" component={NewListing} />
      <Route exact path="/profile" component={EditProfile} />
      <Switch>
        <Route path="/profile/:username" component={Profile} />
      </Switch>
      <Route path="/admin" component={Admin} />
    </Router>
  );
}
export default App;
