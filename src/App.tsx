// Pages
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import PostAd from "./pages/PostAd";
// import Buy from "./pages/Buy";
// import Manage from "./pages/Manage";
import UserListings from "./pages/UserListings";
import EditProfile from "./pages/EditProfile";
import Admin from "./pages/Admin";

import { history } from "./helpers/history";
import { Router, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

import "./App.css";

function App() {
  return (
    <Router history={history}>
      <Route exact path="/" component={Home} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
      <PrivateRoute path="/postad" component={PostAd} />
      {/* <PrivateRoute path="/buy/:id" component={Buy} /> */}
      <PrivateRoute path="/userlistings" component={UserListings} />
      <PrivateRoute path="/profile" component={EditProfile} />
      <PrivateRoute path="/admin" component={Admin} />
      {/* <PrivateRoute path="/manage/:id" component={Manage} /> */}
    </Router>
  );
}
export default App;
