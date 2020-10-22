import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import axios from 'axios';

import App from "./App";
import MainPage from "./Main/MainPage";
import SignIn from "./Main/SignIn";
import LogIn from "./Main/Login";
import MyProfile from "./Main/MyProfile";
import Logout from "./Main/Logout";

axios.defaults.withCredentials = true;

export default class Routing extends React.Component {

  componentWillMount() {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = token;
    }
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route path="/signin">
              <SignIn/>
            </Route>
            <Route path="/login">
              <LogIn/>
            </Route>
            <Route path="/logout">
              <Logout/>
            </Route>
            <Route exact path="/">
              <App/>
            </Route>
            <Route path="/myprofile">
              <MyProfile/>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}




