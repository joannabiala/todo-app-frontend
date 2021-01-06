import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import axios from 'axios';
import MyProfile from "./Main/MyProfile";
import MainPage from "./Main/MainPage";
import "./css/app.css";

axios.defaults.withCredentials = true;

const App = () =>{

  const token = localStorage.getItem('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  }

    return (
      <Router>
        <div>
          <Switch>
            <Route path="/main">
              <MainPage/>
            </Route>
            <Route path="/myprofile">
              <MyProfile/>
            </Route>
          </Switch>
        </div>
      </Router>
    );
}


export default App